import Helper from '../services/Helper';

module.exports = {
  async user(obj) {
    let error = 0;
    let details = Array();

    if (
      !obj.nome ||
      obj.nome.trim().length < 2 ||
      obj.nome.trim().length > 255
    ) {
      error++;
      let detail = {
        field: 'nome',
        message: 'Must a string between 2 and 255 characters.',
      };
      details.push(detail);
    }
    if (!obj.dataInicial) {
      error++;
      let detail = {
        field: `dataInicial`,
        message: 'This field cannot be blank.',
      };
      details.push(detail);
    }
    if (!obj.dataFinal) {
        error++;
        let detail = {
          field: `dataFinal`,
          message: 'This field cannot be blank.',
        };
        details.push(detail);
      }
    if (!obj.cnpj || !Helper.isCnpj(obj.cnpj)) {
      error++;
      let detail = {
        field: 'cnpj',
        message: 'Must be a valid Cnpj.',
      };
      details.push(detail);
    }
    if (
      !obj.observacoes ||
      obj.observacoes.trim().length < 2 ||
      obj.observacoes.trim().length > 255
    ) {
      error++;
      let detail = {
        field: 'observacoes',
        message: 'Must a string between 2 and 255 characters.',
      };
      details.push(detail);
    }

    if (error > 0) return details;

    return 0;
  },
};
