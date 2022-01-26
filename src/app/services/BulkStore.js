async function BulkStore(req, res) {

    const PdfList = require("../models/PdfList.js")
    const fs = require('fs');
    const path = require('path');
    const pdfparse = require('pdf-parse');

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
    console.log(id)
    var name = file[0].fileName
    console.log(name)
    var filePath = path.resolve(__dirname, '..', '..', 'public', `${name}`)
    console.log(filePath)


    const dataBuffer = fs.readFileSync(filePath);


    // get the information

    pdfparse(dataBuffer).then(function(data) {

        console.log(data);
    });

    //     const stream = fs.createReadStream(filePath)
    //     let errorList = []

    //     if (fs.existsSync(filePath)) {

    //         var pdfParse = new pdf();

    //         pdfParse.on("pdfParser_dataError", function(errData) {
    //             console.error("aqqqqqq", errData.parserError)
    //         });
    //         pdfParse.on("pdfParser_dataReady", function(pdfData) {
    //             console.log(pdfData, "aq"),
    //                 console.log(Pages.Texts)
    //         });
    //         pdfParse.loadPDF(filePath);
    //         console.log('Arquivo localizado');
    //     } else {
    //         console.log('Arquivo não localizado');
    //     }
}
module.exports = BulkStore