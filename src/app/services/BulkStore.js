async function BulkStore(req, res) {

    const PdfList = require("../models/PdfList.js")
    const fs = require('fs');
    const path = require('path');
    const PDFParser = require('pdf2json');
    const file = await PdfList.findAll({
        limit: 1,
        where: {
            status: 'Pendente'
        }
    })
    if (file.length == 0) {
        console.log('Sem arquivos pendentes')
        return;
    }

    var id = file[0].id
    var name = file[0].fileName
    var filePath = path.resolve(__dirname, '..', '..', 'public', `${name}`)

    const stream = fs.createReadStream(filePath)
    let products = []
    let errorList = []

    const streamCsv = PDFParser.parse({
            headers: [
                // 'establishmentId',
                // 'categoryName',
                // 'name',
                // 'brand',
                // 'type',
                // 'size',
                // 'color',
                // 'description',
                // 'price',
                // 'isAvailable',
                // 'quantity',
                // 'modelType',
                // 'modelBrand',
                // 'modelName',
                // 'sinceYear',
                // 'toYear'
            ],
            skipRows: 5,
            delimiter: ',',
            quote: '"'
        })
        .on('error', error => console.log(error))
        .on('data', async data => {

            let available = true

            if (data.isAvailable != "Sim") {
                available = false
            } else {
                available = true
            }

            const obj = {
                // establishmentId: data.establishmentId,
                // categoryName: data.categoryName,
                // name: data.name,
                // brand: data.brand,
                // type: data.type,
                // size: data.size,
                // color: data.color,
                // description: data.description,
                // price: data.price,
                // quantity: data.quantity,
                // isAvailable: available,
                // models: {
                //     modelType: data.modelType,
                //     modelBrand: data.modelBrand,
                //     modelName: data.modelName,
                //     sinceYear: data.sinceYear,
                //     toYear: data.toYear
                // }
            }

            const errorDetails = await ValidatorPdf.product(obj)
            if (errorDetails != 0) {

                const wrongObj = {
                    // establishmentId: data.establishmentId,
                    // categoryName: data.categoryName,
                    // name: data.name,
                    // brand: data.brand,
                    // type: data.type,
                    // size: data.size,
                    // color: data.color,
                    // description: data.description,
                    // price: data.price,
                    // quantity: data.quantity,
                    // isAvailable: available,
                    // modelType: data.modelType,
                    // modelBrand: data.modelBrand,
                    // modelName: data.modelName,
                    // sinceYear: data.sinceYear,
                    // toYear: data.toYear
                }

                errorList.push(wrongObj)

            } else {
                pdf.push(obj)
            }

        })
    stream.pipe(streamCsv)

}

module.exports = BulkStore