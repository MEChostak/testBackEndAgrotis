// @ts-nocheck

// eslint-disable-next-line no-unused-vars
async function BulkStore(req, res) {
    const PdfList = require('../models/PdfList.js');
    const fs = require('fs');
    const path = require('path');
    const PDFParser = require('pdf2json');

    const files = [];
    // import { readPdfText } from 'pdf-text-reader';

    // procura no banco se existe arquivo com status pendente
    const file = await PdfList.findAll({
        limit: 1,
        where: {
            status: 'Pendente',
        },
    });
    if (file.length == 0) {
        console.log('Sem arquivos pendentes');
        return;
    }

    const { id } = file[0];
    // console.log(id)
    const name = file[0].fileName;
    // console.log(name)
    const filePath = path.resolve(__dirname, '..', '..', 'public', `${name}`);
    // console.log(filePath)

    const data = await new Promise(async(resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);

        pdfParser.loadPDF(filePath);

        // console.log(pdfParser)

        // On data ready
        pdfParser.on('pdfParser_dataReady', pdfData => {
            pages = pdfData.Pages.length;
            // console.log(pages)
            // The raw PDF data in text form
            const raw = pdfParser.getRawTextContent(); /* .replace(/(?:\\[rn]|[\r\n\s]+)+/g, " ") */
            //console.log(raw);
            var vetor = raw.split("\n");
            // console.log(vetor);

            var lendo = 0;
            var j = 0;
            var listContrib = [];
            for (var i = 0; i < vetor.length; i++) {
                var contrib = [];
                var contrib2 = [];

                //console.log(`for ${i}`);
                if (vetor[i].indexOf('Contribuições') == 0) {
                    //console.log(`for ${i}`)
                    //console.log(vetor[i]);

                    contrib['comp'] = vetor[i].substring(13).replace('\r', '');
                    contrib['dtPgto'] = vetor[i + 1].replace('\r', '');
                    contrib['salContrib'] = vetor[i + 2].replace('\r', '');
                    contrib['ind'] = vetor[i + 3].replace('\r', '');

                    if (vetor[i + 4].indexOf('/') != 2) {
                        contrib['contrib'] = vetor[i + 4];

                        console.log(contrib);
                        listContrib.push(contrib);

                        /// APARENTENMENTO OK
                        j = j + 1;
                        i = i + 5;
                        lendo = 0;
                    } else {
                        contrib2['comp'] = vetor[i + 4].replace('\r', '');
                        contrib2['dtPgto'] = vetor[i + 5].replace('\r', '');
                        contrib2['salContrib'] = vetor[i + 6].replace('\r', '');
                        contrib2['ind'] = vetor[i + 7].replace('\r', '');

                        contrib['contrib'] = vetor[i + 8].replace('\r', '');
                        contrib2['contrib'] = vetor[i + 9].replace('\r', '');

                        console.log(contrib);
                        listContrib.push(contrib);

                        console.log(contrib2);
                        listContrib.push(contrib2);

                        j = j + 1;
                        lendo = 1;
                        i = i + 10;

                        console.log(vetor[i]);
                    }
                }

                if (lendo && vetor[i].indexOf('/') == 2) {
                    //console.log(`for ${i}`);
                    //console.log(`lendo: ${lendo}`);

                    contrib['comp'] = vetor[i];
                    contrib['dtPgto'] = vetor[i + 1];
                    contrib['salContrib'] = vetor[i + 2];
                    contrib['ind'] = vetor[i + 3];

                    //console.log(`contrib 2: ${vetor[i + 4]}`);
                    if (vetor[i + 4].indexOf('/') != 2) {
                        contrib['contrib'] = vetor[i + 4];

                        //console.log(contrib);
                        listContrib.push(contrib);

                        j = j + 1;
                        i = i + 5;
                        lendo = 0;
                    } else {
                        contrib2['comp'] = vetor[i + 4];
                        contrib2['dtPgto'] = vetor[i + 5];
                        contrib2['salContrib'] = vetor[i + 6];
                        contrib2['ind'] = vetor[i + 7];

                        contrib['contrib'] = vetor[i + 8];
                        contrib2['contrib'] = vetor[i + 9];

                        //console.log(contrib);
                        listContrib.push(contrib);

                        //console.log(contrib2);
                        listContrib.push(contrib2);

                        j = j + 1;
                        lendo = 1;
                        i = i + 9;

                        //console.log(vetor[i]);
                    }
                } else {
                    lendo = 0
                }
            }

            console.log(listContrib);
            // Add the patient to the patients array
            files.push(listContrib);
            console.log(listContrib);

            // Save the extracted information to a json file
            fs.writeFileSync('files.json', JSON.stringify(files));

            // var r1 = /\d{2}\/\d{4}\s\d{2}\/\d{2}\/\d{4}\s[1-9]\d{0,2}(?:\.\d{3})*,\d{2}\s+/gm;
            // /* \d{2}\/\d{4}\s este trecho busca data no fomato com 00/0000 com \s espaço no final */
            // /* \d{2}\/\d{2}\/\d{4}\s este trecho busca data no formato 00/00/0000 com \s espaço no final */
            // /* [1-9]\d{0,2}(?:\.\d{3})*,\d{2} este trecho busca valores conforme ref. https://pt.stackoverflow.com/questions/342855/regex-para-valores-monet%C3%A1rios */
            // var date = [];
            // var item;
            // while (item = r1.exec(raw)) {
            //     date.push(item[0]);
            // }
            // console.log(date)

            // var r2 = /[1-9]\d{0,2}(?:\,\d{2})*,\d{2}\s[1-9]\d{0,2}(?:\,\d{2})*,\d{2}\s\d{2}\/\d{4}\s+/gm;
            // var competence = [];
            // var item;
            // while (item = r2.exec(raw)) {
            //     competence.push(item[0]);
            // }
            // console.log(competence)

            // var r3 = /\s[A-Z]{4}+/gm;
            // var indicators = [];
            // var item;
            // while (item = r3.exec(raw)) {
            //     indicators.push(item[0]);
            // }
            // console.log(indicators)
            //     // Return the parsed data
            // resolve({
            //     cpf: /CPF:\s(.*?)Nome/g.exec(raw)[1].trim(),
            //     nit: /NIT:\s(.*?)CPF/g.exec(raw)[1].trim(),
            //     name: /Nome:\s(.*?)Data/g.exec(raw)[1].trim(),
            //     birth: /nascimento:\s(.*?)Nome/g.exec(raw)[1].trim(),
            //     mother: /mãe:\s(.*?)Página/g.exec(raw)[1].trim(),
            //     extractData: /Previdenciário\s(.*?)NIT/g.exec(raw)[1].trim(),
            //     initData: /Individual\s(.*?)RECOLHIMENTO/g.exec(raw)[1].trim(),
            //     // contributionsData: /Contribuições(.*?)Origem/g.exec(raw)[1].trim(),
            // });
        });
    });

    // Add the patient to the patients array
    files.push(listContrib);
    console.log(listContrib);

    // Save the extracted information to a json file
    fs.writeFileSync('files.json', JSON.stringify(files));
}
module.exports = BulkStore;