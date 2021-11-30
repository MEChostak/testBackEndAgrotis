import User from '../models/User';

import Organization from '../models/Organization';

import ValidatorUser from '../services/ValidatorUser';

const Sequelize = require('sequelize');

const jwt = require('jsonwebtoken')

const Op = Sequelize.Op;

module.exports = {

    async store(req, res) {
        const obj = {
            name: req.body.name,
            password: req.body.password,
            mail: req.body.mail,
            personId: req.body.personId,
            organizationId: req.body.organizationId,
            organization: []
        }

        // Valida o objeto
        const errorDetails = await ValidatorUser.user(obj);

        if (errorDetails != 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
            });
        }

        // Verifica se o user já está existe
        const register = await User.findAll({
            limit: 1,
            where: {
                mail: obj.mail
            }
        });
        if (register.length > 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "User already registered.",
                fields: [
                    obj.name,
                ]
            });
        }

        let user;

        if (!obj.organizationId) {
            user = await User.create(
                obj, {
                include: [
                    { association: 'organization' },
                ]
            }
            );
        } else {
            // Valida de organização existe
            user = await User.create(obj);

        }

        if (!user) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create User!",
            });
        } else {
            return res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "User created!",
                data: user
            });
        }
    },

    async update(req, res) {

        const { userId } = req.params;

        const obj = {
            name: req.body.name,
            password: req.body.password,
            mail: req.body.mail,
            personId: req.body.personId,
            organizationId: req.body.organizationId
        }

        // Valida o objeto
        const errorDetails = await ValidatorUser.userUpdate(obj);

        if (errorDetails != 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
            });
        }

        // Verifica se o user existe
        let user = await User.findByPk(
            userId
        );
        if (!user) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "User not found!"
            });
        }

        // Verifica se a organização existe
        let organization = await Organization.findByPk(
            obj.organizationId
        );
        if (!organization) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Organization not found!"
            });
        }

        // Altera o user
        User.update(obj, { where: { id: userId } })
            .then((result) => {

                console.log(result);

                return res.status(200).json({
                    timestamp: Date.now(),
                    ok: true,
                    message: "User updated!"
                });

            }).catch((err) => {

                console.log(err);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to update user!"
                });
            });
    },

    async show(req, res) {

        const userId = req.params.userId;

        // Pesquisar o usuário
        User.findByPk(
            userId,
            // inclui na pesquisa todos os itens relacionados
            {
                include: [
                    { association: 'profile' },
                    { association: 'organization' },
                ]
            }
        ).then(user => {

            console.log(user);

            if (!user) {
                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "User not found!"
                });
            }

            return res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "",
                data: user
            });

        }).catch(err => {

            console.log(err);
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to find user!"
            });
        })
    },

    async list(req, res) {

        const page = req.params.page;

        const obj = {
            name: req.body.name,
            mail: req.body.mail,
            organizationId: req.body.organizationId,
            status: req.body.status,
            personId: req.body.personId,
        }

        const Op = Sequelize.Op;
        var whereClause = new Object();

        if (obj.name) {
            whereClause.name = {
                [Op.like]: '%' + obj.name + '%'
            }
        }

        if (obj.organizationId) {
            whereClause.organizationId = obj.organizationId
        }

        console.log(obj)
        console.log("console log aqui", process.env.PER_PAGE)

        User.findAndCountAll({
            where: whereClause,
            /* include: [
                { association: 'profile' },
                { association: 'organization' },
            ], */
            limit: parseInt(process.env.PER_PAGE),
            offset: (page - 1) * parseInt(process.env.PER_PAGE),
            order: [
                ['id', 'DESC']
            ]
        }).then(user => {
            let response = {
                timestamp: Date.now(),
                ok: true,
                info: {
                    totalRows: user.count,
                    totalPages: Math.ceil(user.count / parseInt(process.env.PER_PAGE)),
                    page: page
                },
                elements: user.rows
            }

            return res.status(200).json(response);

        }).catch(err => {

            console.log(err);
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to list user!"
            });
        });

    },

    async delete(req, res) {
        const { userId } = req.params;

        // Verifica se o user existe
        let user = await User.findByPk(
            userId
        );

        if (!user) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "User not found!"
            });
        }

        // Deleta o user
        User.destroy({ where: { id: userId } })
            .then((result) => {

                console.log(result);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "User deleted!"
                });

            }).catch((err) => {

                console.log(err);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to delete user!"
                });
            });
    },

    async login(req, res) {
        const obj = {
            mail: req.body.mail,
            password: req.body.password
        }
        User.findOne({ where: obj })
            .then(user => {
                console.log(user);
                if (!user) {
                    return res.status(200).send({
                        ok: false,
                        message: 'Usuário não cadastrado com o login informado'
                    });
                }
                console.log("teste", user)
                var _user = {
                    id: user.id,
                    name: user.name,
                    mail: user.mail,
                    organizationId: user.organizationId,
                };
                console.log("user", _user)
                var token = jwt.sign(_user, process.env.SECRETTOKEN, {
                    expiresIn: eval(process.env.TIMEOUT)
                });
                console.log(token)
                return res.status(200).send({
                    ok: true,
                    message: 'Usuário autenticado com sucesso',
                    token: token,
                    id: user.id,
                    name: user.name,
                })
            })
            .catch(err => {
                console.log(err.message)
                return res.status(400).send({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to find user"
                });
            }
            )

    },
};