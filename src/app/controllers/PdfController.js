import PdfList from '../models/PdfList'

const Sequelize = require('sequelize');
const fs = require("fs");
// const PDFParser = require('pdf2json');
const Op = Sequelize.Op
const formidable = require('formidable');
const path = require('path')

import CustomersReading from '../models/CustomersReading'
const PDFParser = require('pdf2json');
// const pdf = require('pdf2json');

module.exports = {
    async bulk(req, res) {
        let timeStamp = Date.now()
        let document = req.files.doc.name
        let fileName = `${timeStamp}_${document}`
        let filePath = path.resolve(__dirname, '..', '..', 'public', fileName)
        let file = req.files.doc.data

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
                console.log(result)
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

    async update(req, res) {

        const { PdfListId } = req.params;

        const obj = {
            name: req.body.name,
            status: req.body.name
        }

        // Altera o status
        PdfList.update(obj,

                {
                    limit: 1,
                    where: {
                        id: PdfListId,
                        status: 'concluido',
                    }
                })
            .then((result) => {

                console.log(result);

                return res.status(200).json({
                    timestamp: Date.now(),
                    ok: true,
                    message: "Status updated!"
                });

            }).catch((err) => {

                console.log(err);

                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to update Status!"
                });
            });
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
            .then(pdf => {
                let response = {
                    timestamp: Date.now(),
                    ok: true,
                    info: {
                        totalRows: pdf.count,
                        totalPages: Math.ceil(pdf.count / parseInt(process.env.PER_PAGE)),
                        page: page,
                    },
                    files: pdf.rows
                }
                return res.status(200).json(response)
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Failed to list pdf"
                })
            })
    },


};