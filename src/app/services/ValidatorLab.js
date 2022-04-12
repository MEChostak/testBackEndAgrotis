import Helper from './Helper';

module.exports = {
  async lab(obj) {
    let error = 0;
    let details = Array();

    if (!obj.laboratorio) {
      if (!obj.laboratorio.idLab) {
        error++;
        let detail = {
          field: `laboratorio.idLab`,
          message: 'This field cannot be blank.',
        };
        details.push(detail);
      }
      if (!obj.laboratorio.nome) {
        error++;
        let detail = {
          field: `laboratorio.nome`,
          message: 'This field cannot be blank.',
        };
        details.push(detail);
      }
    }

    if (error > 0) return details;

    return 0;
  },
};
