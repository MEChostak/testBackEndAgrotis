import Person from '../models/Person';

// import Organization from '../models/Organization';

import ValidatorPerson from '../services/ValidatorPerson';

const Sequelize = require('sequelize');

const jwt = require('jsonwebtoken')

const Op = Sequelize.Op;

module.exports = {

    async store(req, res) {
        const obj = {
            name: req.body.name,
            description: req.body.description,
            birthDate: req.body.birthDate,
            phone: req.body.phone,
            mail: req.body.mail
        }

        // Valida o objeto
        const errorDetails = await ValidatorPerson.person(obj);

        if (errorDetails != 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
            });
        }

        // Verifica se o person já está existe
        const register = await Person.findAll({
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

        // cria person 
        person = await Person.create(obj);


        if (!person) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create Person!",
            });
        } else {
            return res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Person created!",
                data: person
            });
        }
    },

    async update(req, res) {

        const { personId } = req.params;

        const obj = {
            name: req.body.name,
            description: req.body.description,
            birthDate: req.body.birthDate,
            phone: req.body.phone,
            mail: req.body.mail
        }

        // Valida o objeto
        const errorDetails = await ValidatorPerson.person(obj);

        if (errorDetails != 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
            });
        }

        // Verifica se o person existe
        let person = await Person.findByPk(
            personId
        );
        if (!person) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Person not found!"
            });
        }

        // Altera o person
        Person.update(obj, { where: { id: personId } })
            .then((result) => {

                console.log(result);

                return res.status(200).json({
                    timestamp: Date.now(),
                    ok: true,
                    message: "Person updated!"
                });

            }).catch((err) => {

                console.log(err);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to update person!"
                });
            });
    },

    async show(req, res) {

        const personId = req.params.personId;

        // Pesquisar person
        Person.findByPk(
            personId
        ).then(person => {

            console.log(person);

            if (!person) {
                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Person not found!"
                });
            }

            return res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "",
                data: person
            });

        }).catch(err => {

            console.log(err);
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to find person!"
            });
        })
    },

    async list(req, res) {

        const page = req.params.page;

        const obj = {
            name: req.body.name,
            description: req.body.description,
            birthDate: req.body.birthDate,
            phone: req.body.phone,
            mail: req.body.mail
        }

        const Op = Sequelize.Op;
        var whereClause = new Object();

        if (obj.name) {
            whereClause.name = {
                [Op.like]: '%' + obj.name + '%'
            }
        }

        console.log(obj)
        console.log("console log aqui", process.env.PER_PAGE)

        Person.findAndCountAll({
            where: whereClause,
            // include: [
            //     { association: 'profile' },
            //     { association: 'organization' },
            // ],
            limit: parseInt(process.env.PER_PAGE),
            offset: (page - 1) * parseInt(process.env.PER_PAGE),
            order: [
                ['id', 'DESC']
            ]
        }).then(person => {
            let response = {
                timestamp: Date.now(),
                ok: true,
                info: {
                    totalRows: person.count,
                    totalPages: Math.ceil(person.count / parseInt(process.env.PER_PAGE)),
                    page: page
                },
                elements: person.rows
            }

            return res.status(200).json(response);

        }).catch(err => {

            console.log(err);
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to list person!"
            });
        });

    },

    async delete(req, res) {
        const { personId } = req.params;

        // Verifica se o person existe
        let person = await Person.findByPk(
            personId
        );

        if (!person) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Person not found!"
            });
        }

        // Deleta o person
        Person.destroy({ where: { id: personId } })
            .then((result) => {

                console.log(result);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Person deleted!"
                });

            }).catch((err) => {

                console.log(err);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to delete person!"
                });
            });
    },
};