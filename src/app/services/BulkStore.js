// @ts-nocheck

const { afterSync } = require('../models/PdfList.js');

// eslint-disable-next-line no-unused-vars
async function BulkStore(req, res) {
    const CustomersReading = ('../models/CustomersReading');
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
            // The raw PDF data in text form
            const raw = pdfParser.getRawTextContent(); /* .replace(/(?:\\[rn]|[\r\n\s]+)+/g, " ") */
            // console.log(raw);
            /* coloca texto quebrado por linha */
            var vetor = raw.split("\n");
            // console.log(vetor);

            var listContrib = [];

            var listInfo = [];

            var lendo = 0;
            var j = 0;


            for (var i = 0; i < vetor.length; i++) {
                var contrib = [];
                var contrib2 = [];
                var contrib3 = [];
                var contrib4 = [];
                var contrib5 = [];
                var contrib6 = [];
                var info = [];
                var info2 = [];
                var info3 = [];

                if (vetor[i].indexOf('Extrato Previdenciário\r') == 0) {

                    info['extract'] = vetor[i + 1].replace('\r', '');
                    info['nit'] = vetor[i + 3].replace('\r', '');
                    info['cpf'] = vetor[i + 5].replace('\r', '');
                    info['name'] = vetor[i + 7].replace('\r', '');
                    info['birth'] = vetor[i + 9].replace('\r', '');
                    info['mother'] = vetor[i + 11].replace('\r', '');
                    info['page'] = vetor[i + 12].substring(7).replace(' de\r', '');

                    listInfo.push(info);
                    // console.log(info);
                }

                /**************************************************************************************************/
                /*****************LEITURA PARA ARQUIVOS QUE CONTENHAM RENDA CONTRUBUINTE INDIVIDUAL****************/
                /**************************************************************************************************/

                // // console.log(`for ${i}`);
                if (vetor[i].indexOf('Contribuições') == 0) {
                    //console.log(`for ${i}`)
                    // console.log(vetor[i]);

                    contrib['comp'] = vetor[i].substring(13).replace('\r', '');
                    contrib['dtPgto'] = vetor[i + 1].replace('\r', '');
                    contrib['salContrib'] = vetor[i + 2].replace('\r', '');
                    // contrib['ind'] = vetor[i + 3].replace('\r', '');

                    if (vetor[i + 4].indexOf('/') != 2) {
                        contrib['contrib'] = vetor[i + 3].replace('\r', '');

                        listContrib.push(contrib);
                        // console.log(contrib);

                        /// APARENTEMENTE OK
                        j = j + 1;
                        i = i + 5;
                        lendo = 0;

                    } else {
                        contrib2['comp'] = vetor[i + 3].replace('\r', '');
                        contrib2['dtPgto'] = vetor[i + 4].replace('\r', '');
                        contrib2['salContrib'] = vetor[i + 5].replace('\r', '');
                        // contrib2['ind'] = vetor[i + 7].replace('\r', '');

                        contrib['contrib'] = vetor[i + 6].replace('\r', '');
                        contrib2['contrib'] = vetor[i + 7].replace('\r', '');

                        // console.log(contrib);
                        listContrib.push(contrib);

                        // console.log(contrib2);
                        listContrib.push(contrib2);

                        j = j + 1;
                        i = i + 10;
                        lendo = 1;


                        // console.log(vetor[i]);
                    }
                }

                if (lendo && vetor[i].indexOf('/') == 2) {
                    //console.log(`for ${i}`);
                    //console.log(`lendo: ${lendo}`);

                    contrib['comp'] = vetor[i].replace('\r', '');
                    contrib['dtPgto'] = vetor[i + 1].replace('\r', '');
                    contrib['salContrib'] = vetor[i + 2].replace('\r', '');
                    contrib['ind'] = vetor[i + 3].replace('\r', '');

                    //console.log(`contrib 2: ${vetor[i + 4]}`);
                    if (vetor[i + 4].indexOf('/') != 2) {
                        contrib['contrib'] = vetor[i + 4].replace('\r', '');

                        // console.log(contrib);
                        listContrib.push(contrib);

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

                        // console.log(contrib);
                        listContrib.push(contrib);

                        // console.log(contrib2);
                        listContrib.push(contrib2);


                        j = j + 1;
                        lendo = 1;
                        i = i + 9;

                        // console.log(vetor[i]);
                    }

                } else {
                    lendo = 0
                }

                /**************************************************************************************************/
                /************************LEITURA PARA ARQUIVOS QUE CONTENHAM RENDA DE BENEFICIO *******************/
                /**************************************************************************************************/


                if (vetor[i].indexOf('Benefício') == 0) {
                    //console.log(`for ${i}`)
                    // console.log(vetor[i]);

                    info2['nit2'] = vetor[i - 1].replace('\r', '');
                    info2['nb'] = vetor[i - 6].replace('\r', '');
                    info2['vinc'] = vetor[i].replace('\r', '');
                    info2['type'] = vetor[i - 5].replace('\r', '');
                    info2['dataInit'] = vetor[i - 4].replace('\r', '');
                    info2['dataEnd'] = vetor[i - 3].replace('\r', '');
                    info2['sit'] = vetor[i - 2].replace('\r', '');

                    listInfo.push(info2);
                    // console.log(info2);

                    /* lendo valores cabeçalho sequencia 1 */
                    contrib3['comp'] = vetor[i + 10].substring(12).replace('\r', '');
                    contrib3['salContrib'] = vetor[i + 11].replace('\r', '');

                    /* ok até aqui */
                    listContrib.push(contrib3);
                    // console.log(contrib3);

                    if (vetor[i + 12].indexOf('/') != 2) {

                        /// APARENTEMENTE OK
                        j = j + 1;
                        i = i + 12;
                        lendo = 1;
                        // console.log('passei')

                    } else {
                        /* lendo valores cabeçalho sequencia 1 */
                        contrib4['comp'] = vetor[i + 12].replace('\r', '');
                        contrib4['salContrib'] = vetor[i + 13].replace('\r', '');

                        listContrib.push(contrib4);
                        // console.log(contrib4);

                        j = j + 1;
                        lendo = 1;
                        i = i + 14;
                    }
                }

                if (lendo && vetor[i].indexOf('/') == 2) {
                    // console.log(`for ${i}`);
                    // console.log(`lendo: ${lendo}`);
                    // console.log(vetor[i + 1])

                    contrib3['comp'] = vetor[i].replace('\r', '');
                    contrib3['salContrib'] = vetor[i + 1].replace('\r', '');

                    listContrib.push(contrib3);
                    // console.log(contrib3);

                    i = i + 1;
                    // console.log(vetor[i])
                    // console.log(`contrib 3: ${vetor[i]}`);

                    if (vetor[i].indexOf('/') != 2) {
                        /// APARENTEMENTE OK
                        j = j + 1;
                        lendo = 1;
                        // console.log('passei')
                    }

                } else {
                    lendo = 0;
                }

                /**************************************************************************************************/
                /************************LEITURA PARA ARQUIVOS QUE CONTENHAM RENDA DE EMPREGADO *******************/
                /**************************************************************************************************/


                if (vetor[i].indexOf('Código Emp.') == 0) {
                    //console.log(`for ${i}`)
                    // console.log(vetor[i]);

                    info3['nit2'] = vetor[i + 16].replace('\r', '');
                    info3['cnpj'] = vetor[i + 10].replace('\r', '');
                    info3['vinc'] = vetor[i + 11].replace('\r', '');
                    info3['type'] = vetor[i + 12].replace('\r', '');
                    info3['dataInit'] = vetor[i + 13].replace('\r', '');
                    info3['dataEnd'] = vetor[i + 14].replace('\r', '');
                    info3['lastRV'] = vetor[i + 15].replace('\r', '');

                    listInfo.push(info3);
                    // console.log(info3);


                    /* lendo valores cabeçalho sequencia 1 */
                    contrib5['comp'] = vetor[i + 26].substring(12).replace('\r', '');
                    contrib5['salContrib'] = vetor[i + 27].replace('\r', '');

                    /* ok até aqui */
                    listContrib.push(contrib5);
                    // console.log(contrib5);

                    if (vetor[i + 28].indexOf('/') != 2) {

                        /// APARENTEMENTE OK
                        j = j + 1;
                        i = i + 27;
                        lendo = 1;
                        console.log('passei', vetor[i + 27])

                    } else {
                        /* lendo valores cabeçalho sequencia 1 */
                        contrib6['comp'] = vetor[i + 28].replace('\r', '');
                        contrib6['salContrib'] = vetor[i + 29].replace('\r', '');

                        listContrib.push(contrib6);
                        // console.log(contrib6);

                        j = j + 1;
                        lendo = 1;
                        i = i + 30;
                    }
                }

                if (lendo && vetor[i].indexOf('/') == 2) {
                    // console.log(`for ${i}`);
                    // console.log(`lendo: ${lendo}`);
                    // console.log(vetor[i])

                    contrib5['comp'] = vetor[i].replace('\r', '');
                    contrib5['salContrib'] = vetor[i + 1].replace('\r', '');

                    listContrib.push(contrib5);
                    // console.log(contrib5);

                    i = i + 1;
                    // console.log(vetor[i])
                    // console.log(`contrib 3: ${vetor[i]}`);


                    if (vetor[i].indexOf('/') != 2) {
                        /// APARENTEMENTE OK
                        j = j + 1;
                        lendo = 1;
                        // console.log('passei')
                    }

                } else {
                    lendo = 0;
                }
                // console.log(listContrib);
                // console.log(listInfo);
                // console.log("aqui", listContrib)
            }

            // console.log(listContrib[0].name)
            // console.log(listContrib)

            const obj = {
                    name: listInfo[0].name,
                    nit: listInfo[0].nit,
                    cpf: listInfo[0].cpf,
                    birth: listInfo[0].birth,
                    mother: listInfo[0].mother,
                    extract: listInfo[0].extract,
                    contribList: listContrib
                }
                // console.log(obj)
            pdfParser.on("obj", () => {

            });

            /* to do */
        })

    })

}
module.exports = BulkStore;