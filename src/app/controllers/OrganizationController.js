import Organization from '../models/Organization';

import ValidatorOrganization from '../services/ValidatorOrganization';

const Sequelize = require('sequelize');

// const Op = Sequelize.Op;

module.exports = {

    async store(req, res) {
        const obj = {
            name: req.body.name,
            description: req.body.description,
            paymentStatus: req.body.paymentStatus,
            userTest: req.body.userTest,
            planId: req.body.planId
        }

        // Valida o objeto
        const errorDetails = await ValidatorOrganization.Organization(obj);

        if (errorDetails != 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
            });
        }

        // Verifica se o org já está existe
        const register = await Organization.findAll({
            limit: 1,
            where: {
                name: obj.name
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

        let organization = await Organization.create(
            obj
        );

        if (!organization) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create Organization!"
            });
        } else {
            return res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Organization created!",
                data: organization
            });
        }
    },

    async update(req, res) {

        const { organizationId } = req.params;

        const obj = {
            name: req.body.name,
            description: req.body.description,
            paymentStatus: req.body.paymentStatus,
            userTest: req.body.userTest,
            planId: req.body.planId
        }

        // Valida o objeto
        const errorDetails = await ValidatorOrganization.Organization(obj);

        if (errorDetails != 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
            });
        }

        // Verifica se o Org existe
        let organization = await Organization.findByPk(
            organizationId
        );
        if (!organization) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Organization not found!"
            });
        }

        // Altera a oraganization
        Organization.update(obj, { where: { id: organizationId } })
            .then((result) => {

                console.log(result);

                return res.status(200).json({
                    timestamp: Date.now(),
                    ok: true,
                    message: "Organization updated!"
                });

            }).catch((err) => {

                console.log(err);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to update organization!"
                });
            });
    },

    async show(req, res) {

        const organizationId = req.params.organizationId;

        // Pesquisar o usuário
        Organization.findByPk(
            organizationId
            // inclui na pesquisa todos os itens relacionados
        ).then(organization => {

            console.log(organization);

            if (!organization) {
                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Organization not found!"
                });
            }

            return res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "",
                data: organization
            });

        }).catch(err => {

            console.log(err);
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to find organization!"
            });
        })
    },

    async list(req, res) {

        const page = req.params.page;

        const obj = {
            name: req.body.name,
            description: req.body.description,
            paymentStatus: req.body.paymentStatus,
            userTest: req.body.userTest,
            planId: req.body.planId,
            country: req.body.country,
            city: req.body.city,
            state: req.body.state,
        }

        const Op = Sequelize.Op;
        var whereClause = new Object();

        if (obj.name) {
            whereClause.name = {
                [Op.like]: '%' + obj.name + '%'
            }
        }
        if (obj.description) {
            whereClause.description = {
                [Op.like]: '%' + obj.description + '%'
            }
        }
        if (obj.paymentStatus) {
            whereClause.paymentStatus = {
                [Op.like]: '%' + obj.paymentStatus + '%'
            }
        }
        if (obj.userTest) {
            whereClause.userTest = {
                [Op.like]: '%' + obj.userTest + '%'
            }
        }
        if (obj.country) {
            whereClause.country = {
                [Op.like]: '%' + obj.country + '%'
            }
        }

        if (obj.city) {
            whereClause.city = {
                [Op.like]: '%' + obj.city + '%'
            }
        }

        if (obj.state) {
            whereClause.state = {
                [Op.like]: '%' + obj.state + '%'
            }
        }
        console.log(obj)
        console.log("console log aqui", process.env.PER_PAGE)

        Organization.findAndCountAll({
            where: whereClause,
            limit: parseInt(process.env.PER_PAGE),
            offset: (page - 1) * parseInt(process.env.PER_PAGE),
            order: [
                ['id', 'DESC']
            ]
        }).then(organization => {
            let response = {
                timestamp: Date.now(),
                ok: true,
                info: {
                    totalRows: organization.count,
                    totalPages: Math.ceil(organization.count / parseInt(process.env.PER_PAGE)),
                    page: page
                },
                elements: organization.rows
            }

            return res.status(200).json(response);

        }).catch(err => {

            console.log(err);
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to list organization!"
            });
        });

    },

    async delete(req, res) {

        const { organizationId } = req.params;

        // Verifica se o user existe
        let organization = await Organization.findByPk(
            organizationId
        );

        if (!organization) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Organization not found!"
            });
        }

        // Deleta a org
        Organization.destroy({ where: { id: organizationId } })
            .then((result) => {

                console.log(result);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Organization deleted!"
                });

            }).catch((err) => {

                console.log(result);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to delete Organization!"
                });
            });
    },
};