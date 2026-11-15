var destinoModel = require("../models/destinoModel");

function cadastrar(req, res) {
    var pais = req.body.paisServer;
    var cidade = req.body.cidadeServer;
    var tempoEstadia = Number(req.body.tempoEstadiaServer);
    var idUsuario = Number(req.body.idUsuarioServer);

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        res.status(401).send("Usuário não está logado!");
    } else if (pais == undefined || pais.trim() == "") {
        res.status(400).send("O país está inválido!");
    } else if (cidade == undefined || cidade.trim() == "") {
        res.status(400).send("A cidade está inválida!");
    } else if (!Number.isInteger(tempoEstadia) || tempoEstadia < 1) {
        res.status(400).send("O tempo de estadia está inválido!");
    } else {
        destinoModel.buscarUsuario(idUsuario)
            .then(function (resultado) {
                if (resultado.length == 0) {
                    res.status(401).send("Usuário não encontrado!");
                    return;
                }

                return destinoModel.cadastrar(pais.trim(), cidade.trim(), tempoEstadia)
                    .then(function (resultadoCadastro) {
                        res.json(resultadoCadastro);
                    });
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao cadastrar o destino! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listar(req, res) {
    destinoModel.listar()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao listar os destinos! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrar,
    listar
};
