"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _PdfList = _interopRequireDefault(require("../models/PdfList"));

var Sequelize = require('sequelize');

var fs = require("fs"); // const PDFParser = require('pdf2json');


var Op = Sequelize.Op;

var formidable = require('formidable');

var path = require('path'); // const pdf = require('pdf2json');


module.exports = {
  bulk: function bulk(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var timeStamp, document, fileName, filePath, file;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              timeStamp = Date.now();
              document = req.files.doc.name;
              fileName = "".concat(timeStamp, "_").concat(document);
              filePath = path.resolve(__dirname, '..', '..', 'public', fileName);
              file = req.files.doc.data;
              fs.writeFile(filePath, file, function (err) {
                if (err) {
                  console.log(err);
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update product!'
                  });
                }
              });
              _context.next = 8;
              return _PdfList["default"].create({
                fileName: fileName,
                status: 'Pendente'
              }).then(function (result) {
                console.log(result);
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'File uploaded!'
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400);
              });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // Lista todos os arquivos Pdf
  pdflist: function pdflist(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var page;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              page = req.params.page;

              _PdfList["default"].findAndCountAll({
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id']]
              }).then(function (pdf) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: pdf.count,
                    totalPages: Math.ceil(pdf.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  files: pdf.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to list pdf"
                });
              });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};