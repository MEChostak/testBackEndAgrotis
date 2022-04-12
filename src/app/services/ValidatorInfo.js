import Helper from './Helper';

module.exports = {
  async info(obj) {
    let error = 0;
    let details = Array();

    if (!obj.infosPropriedade) {
      if (!obj.infosPropriedade.idInfo) {
        error++;
        let detail = {
          field: `infosPropriedade.idInfo`,
          message: 'This field cannot be blank.',
        };
        details.push(detail);
      }
      if (!obj.infosPropriedade.nome) {
        error++;
        let detail = {
          field: `infosPropriedade.nome`,
          message: 'This field cannot be blank.',
        };
        details.push(detail);
      }
    }

    if (error > 0) return details;

    return 0;
  },
};
