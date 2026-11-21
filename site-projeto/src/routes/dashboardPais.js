var express = require("express");
var router = express.Router();

var dashboardPaisController = require("../controllers/dashboardPaisController");

router.get("/paises/:idUsuario", function (req, res) {
    dashboardPaisController.listarPaises(req, res);
});

router.get("/kpis/:idUsuario/:pais", function (req, res) {
    dashboardPaisController.buscarKpis(req, res);
});

router.get("/cidades/:idUsuario/:pais", function (req, res) {
    dashboardPaisController.buscarCidades(req, res);
});

router.get("/posicao/:idUsuario/:pais", function (req, res) {
    dashboardPaisController.buscarPosicao(req, res);
});

router.get("/cidade-mais-dias/:idUsuario/:pais", function (req, res) {
    dashboardPaisController.buscarCidadeMaisDias(req, res);
});

router.get("/distribuicao-notas/:idUsuario/:pais", function (req, res) {
    dashboardPaisController.buscarDistribuicaoNotas(req, res);
});

router.get("/avaliacoes-mes/:idUsuario/:pais", function (req, res) {
    dashboardPaisController.buscarAvaliacoesPorMes(req, res);
});

router.get("/top-pontos/:idUsuario/:pais", function (req, res) {
    dashboardPaisController.buscarTopPontos(req, res);
});

router.get("/nota-cidade/:idUsuario/:pais", function (req, res) {
    dashboardPaisController.buscarNotaPorCidade(req, res);
});

module.exports = router;
