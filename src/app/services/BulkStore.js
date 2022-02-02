// @ts-nocheck

const { findAll } = require("../models/PdfList.js");

async function BulkStore(req, res) {
    import * as pdfjs from 'pdfjs-dist';
    const PdfList = require("../models/PdfList.js");
    const fs = require('fs');
    const path = require('path');
    const pdfparse = require('pdf-parse');
    const pdfreader = require('pdfreader');
    const PDFParser = require("pdf2json");

    let files = [];
    let pages = 0;

    // import { readPdfText } from 'pdf-text-reader';

    // procura no banco se existe arquivo com status pendente
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
        // console.log(id)
    var name = file[0].fileName
        // console.log(name)
    var filePath = path.resolve(__dirname, '..', '..', 'public', `${name}`)
        // console.log(filePath)

    let data = await new Promise(async(resolve, reject) => {

        let pdfParser = new PDFParser(this, 1);

        pdfParser.loadPDF(filePath);

        // console.log(pdfParser)

        // On data ready
        pdfParser.on("pdfParser_dataReady", (pdfData) => {

            pages = pdfData.Pages.length;
            // console.log(pages)
            // The raw PDF data in text form
            const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
            // console.log(raw)

            // Return the parsed data

            resolve({
                cpf: /CPF:\s(.*?)Nome/i.exec(raw)[1].trim(),
                nit: /NIT:\s(.*?)CPF/i.exec(raw)[1].trim(),
                name: /Nome:\s(.*?)Data/i.exec(raw)[1].trim(),
                birth: /nascimento:\s(.*?)Nome/i.exec(raw)[1].trim(),
                mother: /mãe:\s(.*?)Página/i.exec(raw)[1].trim(),
                extractData: /Previdenciário\s(.*?)NIT/i.exec(raw)[1].trim(),
                initData: /Individual\s(.*?)RECOLHIMENTO/i.exec(raw)[1].trim(),
                contributionsData: /Contribuições(.*?)Origem/i.exec(raw)[1].trim(),
                page: /INSS\s(.*?)Page/i.exec(raw)[1].trim(),
            });
        });
    });

    // Add the patient to the patients array
    files.push(data);
    console.log(data)

    // Save the extracted information to a json file
    fs.writeFileSync("files.json", JSON.stringify(files));

    // pdfparse(filePath).then(function(data) {

    //     //     console.log(data.text)

    //     let str = data.text

    //     let text = str.split('\n')

    //     let name = text[11];
    //     console.log("name:", name)
    //     let birth = text[13];
    //     console.log("birth:", birth)
    //     let mother = text[15];
    //     console.log("mother:", mother)
    //     let extractDate = text[5];
    //     console.log("Data Extrato:", extractDate)
    //     let nit = text[7];
    //     console.log("nit:", nit)
    //     let cpf = text[9];
    //     console.log("CPF:", cpf);
    //     let pages = text[17];
    //     console.log("total de paginas", pages);

    //     // Save the extracted information to a json file
    //     fs.writeFileSync("files.json", JSON.stringify(text));
    // });
}
module.exports = BulkStore