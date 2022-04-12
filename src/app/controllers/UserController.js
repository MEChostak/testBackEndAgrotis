import User from '../models/User';
import Laboratorio from '../models/Laboratorio';
import infosPropriedade from '../models/infosPropriedade';

import ValidatorUser from '../services/ValidatorUser';

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

module.exports = {
  async store(req, res) {
    console.log(req.body.infosPropriedade);
    const obj = {
      nome: req.body.nome,
      dataInicial: req.body.dataInicial,
      dataFinal: req.body.dataFinal,
      cnpj: req.body.cnpj,
      infosPropriedade: [],
      laboratorio: [],
      observacoes: req.body.observacoes,
    };

    if (req.body.infosPropriedade) {
      req.body.infosPropriedade.forEach(element => {
        obj.infosPropriedade.push(element);
      });
    }

    if (req.body.laboratorio) {
      req.body.laboratorio.forEach(element => {
        obj.laboratorio.push(element);
      });
    }

    // Valida o objeto
    const errorDetails = await ValidatorUser.user(obj);

    if (errorDetails != 0) {
      return res.status(400).json({
        timestamp: Date.now(),
        error: 'Malformed object.',
        fields: errorDetails,
      });
    }

    // Verifica se o user já está existe
    const register = await User.findAll({
      limit: 1,
      where: {
        nome: obj.nome,
      },
    });
    if (register.length > 0) {
      return res.status(400).json({
        timestamp: Date.now(),
        error: 'User already registered.',
        fields: [obj.nome],
      });
    }

    let user = await User.create(obj, {
      include: [
        { association: 'laboratorio' },
        { association: 'infosPropriedade' },
      ],
    });

    if (!user) {
      return res.status(400).json({
        timestamp: Date.now(),
        ok: false,
        message: 'Fail to create User!',
      });
    } else {
      return res.status(200).json({
        timestamp: Date.now(),
        ok: true,
        message: 'User created!',
        data: user,
      });
    }
  },

  async update(req, res) {
    const { userId } = req.params;

    const obj = {
      nome: req.body.nome,
      dataInicial: req.body.dataInicial,
      dataFinal: req.body.dataFinal,
      cnpj: req.body.cnpj,
      observacoes: req.body.observacoes,
      infosPropriedade: [],
      laboratorio: [],
    };

    // Valida o objeto
    const errorDetails = await ValidatorUser.user(obj);

    if (errorDetails != 0) {
      return res.status(400).json({
        timestamp: Date.now(),
        error: 'Malformed object.',
        fields: errorDetails,
      });
    }

    // Verifica se o user existe
    let user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({
        timestamp: Date.now(),
        ok: false,
        message: 'User not found!',
      });
    }

    // Altera o user
    User.update(obj, { where: { id: userId } })
      .then(result => {
        console.log(result);

        return res.status(200).json({
          timestamp: Date.now(),
          ok: true,
          message: 'User updated!',
        });
      })
      .catch(err => {
        console.log(err);

        return res.status(400).json({
          timestamp: Date.now(),
          ok: false,
          message: 'Failed to update user!',
        });
      });
  },

  async show(req, res) {
    const userId = req.params.userId;

    // Pesquisar o usuário
    User.findByPk(userId, {
      include: [
        { association: 'laboratorio' },
        { association: 'infosPropriedade' },
      ],
    })
      .then(user => {
        console.log(user);

        if (!user) {
          return res.status(400).json({
            timestamp: Date.now(),
            ok: false,
            message: 'User not found!',
          });
        }

        return res.status(200).json({
          timestamp: Date.now(),
          ok: true,
          message: '',
          data: user,
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json({
          timestamp: Date.now(),
          ok: false,
          message: 'Failed to find user!',
        });
      });
  },

  async list(req, res) {
    const page = req.params.page;

    const obj = {
      nome: req.body.nome,
      cnpj: req.body.cnpj,
    };

    const Op = Sequelize.Op;
    var whereClause = new Object();

    if (obj.nome) {
      whereClause.nome = {
        [Op.like]: '%' + obj.nome + '%',
      };
    }

    if (obj.cnpj) {
      whereClause.cnpj = {
        [Op.like]: '%' + obj.cnpj + '%',
      };
    }

    User.findAndCountAll({
      where: whereClause,
      include: [
        { association: 'laboratorio' },
        { association: 'infosPropriedade' },
      ],
      limit: parseInt(process.env.PER_PAGE),
      offset: (page - 1) * parseInt(process.env.PER_PAGE),
      order: [['id', 'DESC']],
    })
      .then(user => {
        let response = {
          timestamp: Date.now(),
          ok: true,
          info: {
            totalRows: user.count,
            totalPages: Math.ceil(user.count / parseInt(process.env.PER_PAGE)),
            page: page,
          },
          elements: user.rows,
        };

        return res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json({
          timestamp: Date.now(),
          ok: false,
          message: 'Failed to list user!',
        });
      });
  },

  async delete(req, res) {
    const { userId } = req.params;

    // Verifica se o user existe
    let user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({
        timestamp: Date.now(),
        ok: false,
        message: 'User not found!',
      });
    }

    // Deleta o user
    User.destroy({ where: { id: userId } })
      .then(result => {
        console.log(result);

        return res.status(400).json({
          timestamp: Date.now(),
          ok: false,
          message: 'User deleted!',
        });
      })
      .catch(err => {
        console.log(err);

        return res.status(400).json({
          timestamp: Date.now(),
          ok: false,
          message: 'Failed to delete user!',
        });
      });
  },

  /*  */
  /*  */
  /*  */

  // Adicionar lab
  async labStore(req, res) {
    const obj = {
      userId: {},
      idLab: req.body.idLab,
      nomeLab: req.body.nomeLab,
    };

    // Id do usuário
    if (req.body.userId) {
      obj.userId = req.body.userId;
    }

    const errorDetails = await ValidatorLab.lab(obj);
    if (errorDetails != 0) {
      return res.status(400).json({
        timestamp: Date.now(),
        error: 'Malformed object.',
        fields: errorDetails,
      });
    }

    // Verifica se o usuário existe
    const register = await User.findAll({
      limit: 1,
      where: {
        id: obj.userId,
      },
    });
    if (register.length == 0) {
      return res.status(400).json({
        timestamp: Date.now(),
        error: "User doesn't exist",
        fields: [obj.userId],
      });
    }

    // Cria na tabela
    let lab = await Laboratorio.create(obj);
    if (!lab) {
      return res.status(400).json({
        timestamp: Date.now(),
        ok: false,
        message: 'Fail to create laboratory!',
      });
    } else {
      return res.status(200).json({
        timestamp: Date.now(),
        ok: true,
        message: 'Laboratory created!',
        address: obj,
      });
    }
  },

  // Deletar lab
  async labDelete(req, res) {
    const { labId } = req.params;

    let lab = await Laboratorio.findByPk(labId);
    if (!lab) {
      return res.status(400).json({
        timestamp: Date.now(),
        ok: false,
        message: 'Laboratory not found!',
      });
    } else {
      Laboratorio.destroy({ where: { id: labId } })
        .then(result => {
          return res.status(200).json({
            timestamp: Date.now(),
            ok: true,
            message: 'Laboratory deleted!',
          });
        })
        .catch(err => {
          console.log(err);
          return res.status(400).json({
            timestamp: Date.now(),
            ok: false,
            message: 'Fail to delete laboratory!',
          });
        });
    }
  },

  /*  */
  /*  */
  /*  */

  // Adicionar info
  async infoStore(req, res) {
    const obj = {
      userId: {},
      idInfo: req.body.idInfo,
      nomeInfo: req.body.nomeInfo,
    };

    // Id do usuário
    if (req.body.userId) {
      obj.userId = req.body.userId;
    }

    const errorDetails = await ValidatorInfo.info(obj);
    if (errorDetails != 0) {
      return res.status(400).json({
        timestamp: Date.now(),
        error: 'Malformed object.',
        fields: errorDetails,
      });
    }

    // Verifica se o User existe
    const register = await User.findAll({
      limit: 1,
      where: {
        id: obj.userId,
      },
    });
    if (register.length == 0) {
      return res.status(400).json({
        timestamp: Date.now(),
        error: "User doesn't exist",
        fields: [obj.userId],
      });
    }

    let info = await infosPropriedade.create(obj);
    if (!info) {
      return res.status(400).json({
        timestamp: Date.now(),
        ok: false,
        message: 'Failed to create info',
      });
    } else {
      return res.status(200).json({
        timestamp: Date.now(),
        ok: true,
        message: 'Info created!',
        payment: obj,
      });
    }
  },

  // Deletar info
  async infoDelete(req, res) {
    const { infoId } = req.params;

    let info = await infosPropriedade.findByPk(infoId);
    if (!info) {
      return res.status(400).json({
        timestamp: Date.now(),
        ok: false,
        message: 'Info not found!',
      });
    } else {
      infosPropriedade
        .destroy({ where: { id: infoId } })
        .then(result => {
          return res.status(200).json({
            timestamp: Date.now(),
            ok: true,
            message: 'Info deleted!',
          });
        })
        .catch(err => {
          console.log(err);
          return res.status(400).json({
            timestamp: Date.now(),
            ok: false,
            message: 'Fail to delete info!',
          });
        });
    }
  },
};
