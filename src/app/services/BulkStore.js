// @ts-nocheck
// eslint-disable-next-line no-unused-vars
async function BulkStore(req, res) {
    const CustomersReading = ('../models/CustomersReading.js');
    const PdfList = require('../models/PdfList.js');
    const fs = require('fs');
    const path = require('path');
    const PDFParser = require('pdf2json');
    const files = [];


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

    let { id } = file[0];
    // console.log(id)
    const name = file[0].fileName;
    // console.log(name)
    const filePath = path.resolve(__dirname, '..', '..', 'public', `${name}`);
    // console.log(filePath)

    /* LEITURA DO BANCO PARA VERIFICAR SE EXISTE  */

    const pdfParser = new PDFParser(this, 1);

    pdfParser.loadPDF(filePath);

    // On data ready
    pdfParser.once('pdfParser_dataReady', pdfData => {

        // The raw PDF data in text form
        const raw = pdfParser.getRawTextContent(); /* .replace(/(?:\\[rn]|[\r\n\s]+)+/g, " ") */
        // console.log(raw);
        /* coloca texto quebrado por linha */
        var vetor = raw.split("\n");
        // console.log(vetor);

        var listContrib = [];
        var listInfo = [];
        var lendoContribuicoes = 0;
        var lendoRemuneracoes = 0;
        var lendoBeneficios = 0;
        var cabecalho = 0;
        var j = 0;
        let statement = {};
        var sequency = {};
        //console.log('vetor', vetor);

        for (var i = 0; i < vetor.length; i++) {
            // console.log('vetor i', vetor[i]);
            var contrib = [];
            var contrib2 = [];
            var contrib3 = [];
            var contrib4 = [];
            var contrib5 = [];
            var contrib6 = [];
            var info = [];
            var info2 = [];
            var info3 = [];

            if (vetor[i].indexOf('Extrato Previdenciário\r') == 0 && cabecalho != 1) {
                //var statement = {}
                statement.data = vetor[i + 1].replace('\r', '');
                statement.person = {
                    nit: vetor[i + 3].replace('\r', ''),
                    cpf: vetor[i + 5].replace('\r', ''),
                    name: vetor[i + 7].replace('\r', ''),
                    birth: vetor[i + 9].replace('\r', ''),
                    mother: vetor[i + 11].replace('\r', ''),
                };
                statement.sequencies = [];
                cabecalho = 1;
            }

            /**************************************************************************************************/
            /*****************LEITURA PARA ARQUIVOS QUE CONTENHAM RENDA CONTRUBUINTE INDIVIDUAL****************/
            /**************************************************************************************************/

            if (vetor[i].indexOf('RECOLHIMENTO') == 0) {
                // console.log('RECOLHIMENTO', 1);
                // console.log(`for ${i}`)
                // console.log(vetor[i]);

                var sequency = {
                    seq: vetor[i - 5].replace('\r', ''),
                    nit: vetor[i - 1].replace('\r', ''),
                    dataInit: vetor[i - 3].replace('\r', ''),
                    dataEnd: vetor[i - 2].replace('\r', ''),
                    contribList: []
                }
                console.log('sequency', sequency);
            }

            if (vetor[i].indexOf('Contribuições') == 0) {
                var contrib = {
                    comp: vetor[i].substring(13).replace('\r', ''),
                    dtPgto: vetor[i + 1].replace('\r', ''),
                    salContrib: vetor[i + 2].replace('\r', ''),
                    ind: vetor[i + 3].replace('\r', '')
                }

                if (vetor[i + 4].indexOf('/') != 2) {
                    contrib.contrib = vetor[i + 3].replace('\r', '');

                    sequency.contribList.push(contrib);
                    // console.log('contrib', contrib);
                    statement.sequencies.push(sequency);
                    // console.log('sequency', sequency);

                    /// APARENTEMENTE OK
                    j = j + 1;
                    i = i + 5;
                    lendoContribuicoes = 0;

                } else {
                    var contrib2 = {
                        comp: vetor[i + 3].replace('\r', ''),
                        dtPgto: vetor[i + 4].replace('\r', ''),
                        salContrib: vetor[i + 5].replace('\r', ''),
                        // contrib2['ind'] = vetor[i + 7].replace('\r', '');
                    }

                    contrib.contrib = vetor[i + 6].replace('\r', '');
                    contrib2.contrib = vetor[i + 7].replace('\r', '');

                    // console.log(contrib);
                    // console.log('sequency', sequency)
                    sequency.contribList.push(contrib);

                    // console.log(contrib2);
                    sequency.contribList.push(contrib2);
                    statement.sequencies.push(sequency);

                    j = j + 1;
                    i = i + 10;
                    lendoContribuicoes = 1;
                    // console.log(vetor[i]);
                }
            }

            if (lendoContribuicoes && vetor[i].indexOf('/') == 2) {
                //console.log(`for ${i}`);
                //console.log(`lendo: ${lendo}`);
                var contrib = {
                    comp: vetor[i].replace('\r', ''),
                    dtPgto: vetor[i + 1].replace('\r', ''),
                    salContrib: vetor[i + 2].replace('\r', ''),
                    ind: vetor[i + 3].replace('\r', ''),
                }

                //console.log(`contrib 2: ${vetor[i + 4]}`);
                if (vetor[i + 4].indexOf('/') != 2) {
                    contrib['contrib'] = vetor[i + 4].replace('\r', '');

                    // console.log(contrib);
                    sequency.contribList.push(contrib);
                    statement.sequencies.push(sequency);

                    j = j + 1;
                    i = i + 5;
                    lendoContribuicoes = 0;

                } else {
                    var contrib2 = {
                        comp: vetor[i + 4].replace('\r', ''),
                        dtPgto: vetor[i + 5].replace('\r', ''),
                        salContrib: vetor[i + 6].replace('\r', ''),
                        ind: vetor[i + 7].replace('\r', ''),
                    }

                    contrib.contrib = vetor[i + 8].replace('\r', '');
                    contrib2.contrib = vetor[i + 9].replace('\r', '');

                    // console.log(contrib);
                    sequency.contribList.push(contrib);

                    // console.log(contrib2);
                    sequency.contribList.push(contrib2);


                    j = j + 1;
                    lendoContribuicoes = 1;
                    i = i + 9;

                    // console.log(vetor[i]);
                }

            } else if (lendoContribuicoes) {
                lendoContribuicoes = 0
                statement.sequencies.push(sequency)
            }

            /**************************************************************************************************/
            /************************LEITURA PARA ARQUIVOS QUE CONTENHAM RENDA == BENEFICIO *******************/
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
                    lendoBeneficios = 1;
                    // console.log('passei')

                } else {
                    /* lendo valores cabeçalho sequencia 1 */
                    contrib4['comp'] = vetor[i + 12].replace('\r', '');
                    contrib4['salContrib'] = vetor[i + 13].replace('\r', '');

                    listContrib.push(contrib4);
                    // console.log(contrib4);

                    j = j + 1;
                    lendoBeneficios = 1;
                    i = i + 14;
                }
            }

            if (lendoBeneficios && vetor[i].indexOf('/') == 2) {
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
                    lendoBeneficios = 1;
                    // console.log('passei')
                }

            } else {
                lendoBeneficios = 0;
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
                    lendoRemuneracoes = 1;
                    console.log('passei', vetor[i + 27])

                } else {
                    /* lendo valores cabeçalho sequencia 1 */
                    contrib6['comp'] = vetor[i + 28].replace('\r', '');
                    contrib6['salContrib'] = vetor[i + 29].replace('\r', '');

                    listContrib.push(contrib6);
                    // console.log(contrib6);

                    j = j + 1;
                    lendoRemuneracoes = 1;
                    i = i + 30;
                }
            }

            if (lendoRemuneracoes && vetor[i].indexOf('/') == 2) {
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
                    lendoRemuneracoes = 1;
                    // console.log('passei')
                }

            } else {
                lendoRemuneracoes = 0;
            }
            // console.log(listContrib);
            // console.log(listInfo);
            // console.log("aqui", listContrib)
        }
        // index = i;

        /* provavel não ira usar */
        const obj = {
                name: listInfo[0].name,
                nit: listInfo[0].nit,
                cpf: listInfo[0].cpf,
                birth: listInfo[0].birth,
                mother: listInfo[0].mother,
                extract: listInfo[0].extract,
                infoList: listInfo,
                contribList: listContrib,
            }

            /* to do */
            // console.log("statement", statement)
        /* linha 372 este trecho mapeia os dados do obj */
            statement.sequencies.map(value => console.log(value));
        /*  */
        files.push(obj)

        jsonOut(obj)


        // console.log(files)
        // fs.writeFileSync(`cnis_${obj.name}.json`, JSON.stringify(obj));
        function jsonOut(obj) {
            try {
                fs.writeFileSync(
                        path.resolve(__dirname, '..', '..', 'public', 'cnis_json', `cnis_${obj.name}.json`),
                        JSON.stringify(obj)
                    )
                    /* update no status do arquivo pdf */
                    // update(id);
                    /* store obj após leitura do pdf */
                    // store(obj);
                    // console.log(obj)

            } catch (error) {
                console.log(error)
            }
        }
    })

}

async function store(obj, req, res) {
    const Sequelize = require('sequelize');
    const CustomersReading = require('../models/CustomersReading.js');
    const CustomerReadingController = require('../controllers/CustomerReadingController');
    // console.log("chamei", obj.contribList[0])
    // atualizar arquivo com status pendente

    const data = {
        name: obj.name,
        nit: obj.nit,
        cpf: obj.cpf,
        birth: obj.birth,
        mother: obj.mother,
        extract: obj.extract,
        infoList: obj.infoList.toString(),
        contribList: obj.contribList.toString(),
    }
    console.log(data)
    let customer;

    customer = await CustomersReading.create(data);

    // if (!customer) {
    //     return res.status(400).json({
    //         timestamp: Date.now(),
    //         ok: false,
    //         message: "Fail to create Customer!",
    //     });
    // } else {
    //     return res.status(200).json({
    //         timestamp: Date.now(),
    //         ok: true,
    //         message: "Customer created!",
    //         data: customer
    //     });
    // }
}

async function update(res) {
    // console.log("chamei", res)

    const PdfList = require('../models/PdfList.js');
    const id = res;
    console.log(id)
    const obj = {
            status: 'concluido'
        }
        // atualizar arquivo com status pendente
    PdfList.update(obj, { where: { id: id } })
        .then((result) => {

            console.log(result);

            // return res.status(200).json({
            //     timestamp: Date.now(),
            //     ok: true,
            //     message: "User updated!"
            // });

        }).catch((err) => {

            console.log(err);

            // return res.status(400).json({
            //     timestamp: Date.now(),
            //     ok: false,
            //     message: "Failed to update user!"
            // });
        });
}

module.exports = BulkStore;