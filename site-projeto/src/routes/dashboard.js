var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/kpis/:idUsuario", function (req, res) {
    dashboardController.buscarKpis(req, res);
});

router.get("/lista-paises/:idUsuario", function (req, res) {
    dashboardController.buscarListaPaises(req, res);
});

router.get("/cidades-avaliadas/:idUsuario", function (req, res) {
    dashboardController.buscarCidadesAvaliadas(req, res);
});

router.get("/pais-mais-dias/:idUsuario", function (req, res) {
    dashboardController.buscarPaisMaisDias(req, res);
});

router.get("/distribuicao-notas/:idUsuario", function (req, res) {
    dashboardController.buscarDistribuicaoNotas(req, res);
});

router.get("/avaliacoes-mes/:idUsuario", function (req, res) {
    dashboardController.buscarAvaliacoesPorMes(req, res);
});

router.get("/top-pontos/:idUsuario", function (req, res) {
    dashboardController.buscarTopPontos(req, res);
});

router.get("/nota-pais/:idUsuario", function (req, res) {
    dashboardController.buscarNotaPorPais(req, res);
});

module.exports = router;
