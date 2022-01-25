async function BulkStore(req, res) {

    //     const PdfList = require("../models/PdfList.js")
    //     const fs = require('fs');
    //     const path = require('path');
    //     const pdf = require('pdf2json');

    //     const file = await PdfList.findAll({
    //         limit: 1,
    //         where: {
    //             status: 'Pendente'
    //         }

    //     })
    //     if (file.length == 0) {
    //         console.log('Sem arquivos pendentes')
    //         return;
    //     }

    //     var id = file[0].id
    //     var name = file[0].fileName
    //     var filePath = path.resolve(__dirname, '..', '..', 'public', `${name}`)

    //     const stream = fs.createReadStream(filePath)
    //     let errorList = []

    //     if (fs.existsSync(filePath)) {

    //         var pdfParser = new pdf();

    //         pdfParser.on("pdfParser_dataError", function(errData) {
    //             console.error("aqqqqqq", errData.parserError)
    //         });
    //         pdfParser.on("pdfParser_dataReady", function(pdfData) {
    //             console.log(pdfData, "aq"),
    //                 console.log(Pages.Texts)
    //         });
    //         pdfParser.loadPDF(filePath);
    //         console.log('Arquivo localizado');
    //     } else {
    //         console.log('Arquivo não localizado');
    //     }
}



module.exports = BulkStore