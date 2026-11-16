var express = require("express");
var router = express.Router();

var avaliacaoController = require("../controllers/avaliacaoController");

router.get("/listar/:idUsuario", function (req, res) {
    avaliacaoController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
    avaliacaoController.cadastrar(req, res);
});

router.put("/editar/:idComentario", function (req, res) {
    avaliacaoController.editar(req, res);
});

module.exports = router;