var express = require("express");
var router = express.Router();

var destinoController = require("../controllers/destinoController");

router.post("/cadastrar", function (req, res) {
    destinoController.cadastrar(req, res);
});

router.get("/listar", function (req, res) {
    destinoController.listar(req, res);
});

module.exports = router;
