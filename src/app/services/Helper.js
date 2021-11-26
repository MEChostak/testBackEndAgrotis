const Hashids = require('hashids/cjs');

const hashids = new Hashids(
  'kZEEPL5|H7]UH-`(bD$-/73M/B5KJGTZFhpFT|=v~0}^or!/s(Fr;Bmx=@LKQ7UR'
);

module.exports = {
  decrypt(value) {
    return hashids.decode(value)[0];
  },

  encrypt(value) {
    return hashids.encode(value);
  },

  formatDate(date, endDate) {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    let value = [year, month, day].join('-');
    if (endDate) {
      value += ' 23:59:59';
    }
    return value;
  },

  imageFilter(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(png|PNG)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },

  isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  isValidBirthDate(value) {
    const nascimento = new Date(value);

    if (nascimento == 'Invalid Date') return false;

    return true;
  },

  isValidDueDate(value) {
    const due = new Date(value);
    const date = new Date();

    if (due == 'Invalid Date') return false;

    date.setDate(date.getDate() + 1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    due.setHours(due.getHours() + 3);

    if (due.getTime() < date.getTime()) {
      return false;
    }

    return true;
  },

  isCpfOrCnpj(value) {
    if (!module.exports.isNumeric(value)) return false;

    if (value.length > 14) return false;

    if (value.length <= 11) return module.exports.isCpf(value);

    return module.exports.isCnpj(value);
  },

  isCpf(strCPF) {
    let Soma;
    let Resto;
    Soma = 0;
    if (strCPF == '00000000000') return false;

    for (var i = 1; i <= 9; i++)
      Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;

    return true;
  },

  isCnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    )
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  },

  formatCpfCnpj(value) {
    const cnpjCpf = value.replace(/\D/g, '');

    if (cnpjCpf.length === 11) {
      return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    }

    return cnpjCpf.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      '$1.$2.$3/$4-$5'
    );
  },

  formatCep(value) {
    return value.replace(/(\d{5})(\d{3})/g, '$1-$2');
  },

  getDateNow() {
    return new Date()
      .toISOString()
      .substring(0, 19)
      .replace('T', ' ');
  },

  getMonthAndYear(limit) {
    const date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();

    if (currentDay <= limit) {
      if (currentMonth == 1) {
        currentMonth = 12;
        currentYear -= 1;
      } else {
        currentMonth -= 1;
      }
    }

    const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1);

    const result = {
      month: currentMonth,
      year: currentYear,
      firstDay: firstDayOfMonth,
      lastDay: lastDayOfMonth,
    };

    return result;
  },

  getMonthAndYearAtNowLessLimit(limit) {
    const date = new Date();
    date.setDate(date.getDate() - limit);

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;

    const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1);

    const result = {
      month: currentMonth,
      year: currentYear,
      firstDay: firstDayOfMonth,
      lastDay: lastDayOfMonth,
    };

    return result;
  },

  isEmail(mail) {
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        mail
      )
    )
      return true;

    return false;
  },
};
