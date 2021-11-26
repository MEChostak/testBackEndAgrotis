import Plan from '../models/Plan';

import Organization from '../models/Organization';

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

import ValidatorPlan from '../services/ValidatorPlan';

module.exports = {

    async store(req, res) {
        const obj = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            timeCourse: req.body.timeCourse
        }

        // Valida o objeto
        const errorDetails = await ValidatorPlan.Plan(obj);

        if (errorDetails != 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
            });
        }

        // Verifica se o plan já está existe
        const register = await Plan.findAll({
            limit: 1,
            where: {
                name: obj.name,
                price: obj.price
            }
        });

        if (register.length > 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "Plan already registered.",
                fields: [
                    obj.name,
                    obj.price
                ]
            });
        }

        // Cria o plano
        let plan = await Plan.create(
            obj, {
                include: [
                    { association: 'organization' }
                ]
            }
        );

        if (!plan) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create Plan!"
            });
        } else {
            return res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Plan created!"
            });
        }
    },

    async update(req, res) {

        const { planId } = req.params;

        const obj = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        }

        // Valida o objeto
        const errorDetails = await ValidatorPlan.Plan(obj);

        if (errorDetails != 0) {
            return res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
            });
        }


        // Verifica se o plano existe
        let plan = await Plan.findByPk(
            planId,
        );
        if (!plan) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Plan not found!"
            });
        }

        // Altera o plano
        Plan.update(obj, { where: { id: planId } })
            .then((result) => {

                console.log(result);

                return res.status(200).json({
                    timestamp: Date.now(),
                    ok: true,
                    message: "Updated plan!"
                });

            }).catch((err) => {

                console.log(err);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Fail to update plan!"
                });
            });

    },

    async show(req, res) {

        const planId = req.params.planId;

        // Pesquisa pelo Id
        Plan.findByPk(
            planId,
            // inclui na pesquisa todos os itens relacionados
            {
                include: [
                    { association: 'organization' }
                ]
            }
        ).then(plan => {

            console.log(plan);

            if (!plan) {
                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Plan not found!"
                });
            }

            return res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "",
                data: plan
            });

        }).catch(err => {

            console.log(err);
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to find plan!"
            });
        })

    },

    async list(req, res) {
        const page = req.params.page;

        const obj = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            timeCourse: req.body.timeCourse,
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
        if (obj.price) {
            whereClause.price = obj.price
        }
        if (obj.timeCourse) {
            whereClause.timeCourse = obj.timeCourse
        }
        if (obj.organizationId) {
            whereClause.organizationId = obj.organizationId
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

        Plan.findAndCountAll({
            where: whereClause,
            include: [
                { association: 'organization' },
            ],
            limit: parseInt(process.env.PER_PAGE),
            offset: (page - 1) * parseInt(process.env.PER_PAGE),
            order: [
                ['id', 'DESC']
            ]
        }).then(plan => {
            let response = {
                timestamp: Date.now(),
                ok: true,
                info: {
                    totalRows: plan.count,
                    totalPages: Math.ceil(plan.count / parseInt(process.env.PER_PAGE)),
                    page: page
                },
                elements: plan.rows
            }

            return res.status(200).json(response);

        }).catch(err => {

            console.log(err);
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to list plan!"
            });
        });

    },

    async delete(req, res) {

        const { planId } = req.params;

        // Verifica se o plano existe
        let plan = await Plan.findByPk(
            planId
        );

        if (!plan) {
            return res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Plan not found!"
            });
        }

        // Deleta o plan
        Plan.destroy({ where: { id: planId } })
            .then((result) => {

                console.log(result);

                return res.status(200).json({
                    timestamp: Date.now(),
                    ok: true,
                    message: "Deleted plan!"
                });

            }).catch((err) => {

                console.log(result);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Fail to delete plan!"
                });
            });
    },
};