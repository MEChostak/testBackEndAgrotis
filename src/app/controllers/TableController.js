import Table from '../models/Table';

import ValidatorTable from '../services/ValidatorTable';

const Sequelize = require('sequelize');

const jwt = require('jsonwebtoken')

const Op = Sequelize.Op;

module.exports = {

    async store(req, res) {
        const obj = {
            mouth: req.body.mouth,
            year: req.body.year,
            value: req.body.value
        }

        // Valida o objeto
        const errorDetails = await ValidatorTable.table(obj);

        if (errorDetails != 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
            });
        }

        // Verifica se a table já está existe
        const register = await Table.findAll({
            limit: 1,
            where: {
                mouth: obj.mouth
            }
        });
        if (register.length > 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "Mouth already registered.",
                fields: [
                    obj.mouth,
                ]
            });
        }

        let table;

        table = await Table.create(obj);


        if (!table) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create Table!",
            });
        } else {
            return res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Table created!",
                data: table
            });
        }
    },

    async update(req, res) {

        const { tableId } = req.params;

        const obj = {
            mouth: req.body.mouth,
            year: req.body.year,
            value: req.body.value
        }

        // Valida o objeto
        const errorDetails = await ValidatorTable.table(obj);

        if (errorDetails != 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
            });
        }

        // Verifica se table existe
        let table = await Table.findByPk(
            tableId
        );
        if (!table) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Table not found!"
            });
        }

        // Change table
        Table.update(obj, { where: { id: tableId } })
            .then((result) => {

                console.log(result);

                return res.status(200).json({
                    timestamp: Date.now(),
                    ok: true,
                    message: "Table updated!"
                });

            }).catch((err) => {

                console.log(err);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to update table!"
                });
            });
    },

    async show(req, res) {

        const tableId = req.params.tableId;

        // Pesquisar a tabela
        Table.findByPk(
            tableId
        ).then(table => {

            console.log(table);

            if (!table) {
                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Table not found!"
                });
            }

            return res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "",
                data: table
            });

        }).catch(err => {

            console.log(err);
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to find table!"
            });
        })
    },

    async list(req, res) {

        const page = req.params.page;

        const obj = {
            mouth: req.body.mouth,
            year: req.body.year,
            value: req.body.value
        }

        const Op = Sequelize.Op;
        var whereClause = new Object();

        if (obj.mouth) {
            whereClause.mouth = {
                [Op.like]: '%' + obj.mouth + '%'
            }
        }

        if (obj.year) {
            whereClause.year = {
                [Op.like]: '%' + obj.year + '%'
            }
        }

        if (obj.value) {
            whereClause.value = {
                [Op.like]: '%' + obj.value + '%'
            }
        }

        
        console.log(obj)
        console.log("console log aqui", process.env.PER_PAGE)

        Table.findAndCountAll({
            where: whereClause,
            limit: parseInt(process.env.PER_PAGE),
            offset: (page - 1) * parseInt(process.env.PER_PAGE),
            order: [
                ['id', 'DESC']
            ]
        }).then(table => {
            let response = {
                timestamp: Date.now(),
                ok: true,
                info: {
                    totalRows: table.count,
                    totalPages: Math.ceil(table.count / parseInt(process.env.PER_PAGE)),
                    page: page
                },
                elements: table.rows
            }

            return res.status(200).json(response);

        }).catch(err => {

            console.log(err);
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to list table!"
            });
        });

    },

    async delete(req, res) {
        const { tableId } = req.params;

        // Verifica se a table existe
        let table = await Table.findByPk(
            tableId
        );

        if (!table) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Table not found!"
            });
        }

        // Del a table
        Table.destroy({ where: { id: tableId } })
            .then((result) => {

                console.log(result);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Table deleted!"
                });

            }).catch((err) => {

                console.log(err);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to delete table!"
                });
            });
    },

};