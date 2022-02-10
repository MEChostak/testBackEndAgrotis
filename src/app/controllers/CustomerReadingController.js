import CustomersReading from '../models/CustomersReading.js';

// import ValidatorUser from '../services/ValidatorUser';

const Sequelize = require('sequelize');

const jwt = require('jsonwebtoken');

const fs = require("fs");

const path = require('path');

const Op = Sequelize.Op;

module.exports = {


    async store(req, res) {

        const obj = {
            name: req.body.name,
            nit: req.body.nit,
            cpf: req.body.cpf,
            birth: req.body.birth,
            mother: req.body.mother,
            extract: req.body.extract,
            contribList: []
        }

        // Valida o objeto
        // const errorDetails = await ValidatorUser.user(obj);

        // if (errorDetails != 0) {
        //     return res.status(400).json({
        //         timestamp: Date.now(),
        //         error: "Malformed object.",
        //         fields: errorDetails
        //     });
        // }

        // Verifica se o user já está existe
        const register = await CustomersReading.findAll({
            limit: 1,
            where: {
                name: obj.name
            }
        });
        if (register.length > 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "Customer already registered.",
                fields: [
                    obj.name,
                ]
            });
        }

        let customer;
        customer = await CustomersReading.create(obj);


        if (!customer) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create Customer!",
            });
        } else {
            return res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Customer created!",
                data: customer
            });
        }
    },

    async update(req, res) {

        const { customerId } = req.params;

        const obj = {
            name: req.body.name,
            nit: req.body.nit,
            cpf: req.body.cpf,
            birth: req.body.birth,
            mother: req.body.mother,
            extract: req.body.extract,
            contribList: []
        }

        // Valida o objeto
        // const errorDetails = await ValidatorUser.userUpdate(obj);

        // if (errorDetails != 0) {
        //     return res.status(400).json({
        //         timestamp: Date.now(),
        //         error: "Malformed object.",
        //         fields: errorDetails
        //     });
        // }

        // Verifica se o user existe
        let customer = await CustomersReading.findByPk(
            customerId
        );
        if (!customer) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Customer not found!"
            });
        }

        // Altera o user
        CustomersReading.update(obj, { where: { id: customerId } })
            .then((result) => {

                console.log(result);

                return res.status(200).json({
                    timestamp: Date.now(),
                    ok: true,
                    message: "Customer updated!"
                });

            }).catch((err) => {

                console.log(err);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to update customer!"
                });
            });
    },

    async show(req, res) {

        const customerId = req.params.customerId;

        // Pesquisa
        CustomersReading.findByPk(
            customerId,
        ).then(customer => {

            console.log(customer);

            if (!customer) {
                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Customer not found!"
                });
            }

            return res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "",
                data: customer
            });

        }).catch(err => {

            console.log(err);
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to find customer!"
            });
        })
    },

    async list(req, res) {

        const page = req.params.page;

        const obj = {
            name: req.body.name,
            nit: req.body.nit,
            cpf: req.body.cpf,
            birth: req.body.birth,
            mother: req.body.mother,
            extract: req.body.extract,
            contribList: []
        }

        const Op = Sequelize.Op;
        var whereClause = new Object();

        if (obj.name) {
            whereClause.name = {
                [Op.like]: '%' + obj.name + '%'
            }
        }

        if (obj.nit) {
            whereClause.nit = {
                [Op.like]: '%' + obj.nit + '%'
            }
        }

        if (obj.cpf) {
            whereClause.cpf = {
                [Op.like]: '%' + obj.cpf + '%'
            }
        }

        if (obj.birth) {
            whereClause.birth = {
                [Op.like]: '%' + obj.birth + '%'
            }
        }


        console.log(obj)
        console.log("console log aqui", process.env.PER_PAGE)

        CustomersReading.findAndCountAll({
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
        }).then(customer => {
            let response = {
                timestamp: Date.now(),
                ok: true,
                info: {
                    totalRows: customer.count,
                    totalPages: Math.ceil(customer.count / parseInt(process.env.PER_PAGE)),
                    page: page
                },
                elements: customer.rows
            }

            return res.status(200).json(response);

        }).catch(err => {

            console.log(err);
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to list customer!"
            });
        });

    },

    async delete(req, res) {
        const { customerId } = req.params;

        // Verifica se o customer existe
        let customer = await CustomersReading.findByPk(
            customerId
        );

        if (!customer) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Customer not found!"
            });
        }

        // Deleta o user
        CustomersReading.destroy({ where: { id: customerId } })
            .then((result) => {

                console.log(result);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Customer deleted!"
                });

            }).catch((err) => {

                console.log(err);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to delete customer!"
                });
            });
    },

};