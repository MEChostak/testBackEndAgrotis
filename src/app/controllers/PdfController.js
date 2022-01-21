import PdfList from '../models/PdfList'

const Sequelize = require('sequelize');
const fs = require("fs");
// const PDFParser = require('pdf2json');
const Op = Sequelize.Op
const formidable = require('formidable');
const path = require('path')

module.exports = {
    async bulk(req, res) {
        let timeStamp = Date.now()
        let establishment = req.files.userpic.name
        let fileName = `products_${establishment}_${timeStamp}.Pdf`
        let filePath = path.resolve(__dirname, '..', '..', 'public', fileName)
        let file = req.files.userpic.data

        fs.writeFile(filePath, file, (err) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update product!',
                });
            }
        })

        await PdfList.create({
                fileName: fileName,
                status: 'Pendente'
            })
            .then(result => {
                return res.status(200).json({
                    timestamp: Date.now(),
                    ok: true,
                    message: 'File uploaded!'
                })
            })
            .catch(err => {
                console.log(err)
                return res.status(400)
            })



    },

    // Lista todos os arquivos Pdf
    async pdflist(req, res) {
        const { page } = req.params;

        PdfList.findAndCountAll({
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [
                    ['id']
                ]
            })
            .then(product => {
                let response = {
                    timestamp: Date.now(),
                    ok: true,
                    info: {
                        totalRows: product.count,
                        totalPages: Math.ceil(product.count / parseInt(process.env.PER_PAGE)),
                        page: page,
                    },
                    files: product.rows
                }
                return res.status(200).json(response)
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to list product"
                })
            })
    },



};