var avaliacaoModel = require("../models/avaliacaoModel");

function validarAvaliacao(nota, pontoTuristico, comentario) {
    if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
        return "A nota deve ser um número inteiro de 1 a 5!";
    }
    if (typeof pontoTuristico != "string" || pontoTuristico.trim() == "") {
        return "Informe o ponto turístico!";
    }
    return null;
}

function listar(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        res.status(401).send("Usuário inválido!");
        return;
    }

    avaliacaoModel.listar(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao listar as avaliações! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrar(req, res) {
    var idUsuario = Number(req.body.idUsuarioServer);
    var idDestino = Number(req.body.idDestinoServer);
    var nota = Number(req.body.notaServer);
    var pontoTuristico = req.body.pontoTuristicoServer;
    var comentario = String(req.body.comentarioServer || "").trim();

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        res.status(401).send("Usuário não está logado!");
        return;
    }
    if (!Number.isInteger(idDestino) || idDestino <= 0) {
        res.status(400).send("Destino inválido!");
        return;
    }

    var erroValidacao = validarAvaliacao(nota, pontoTuristico, comentario);
    if (erroValidacao) {
        res.status(400).send(erroValidacao);
        return;
    }

    avaliacaoModel.verificarDono(idDestino, idUsuario)
        .then(function (resultado) {
            if (resultado.length == 0) {
                res.status(403).send("Este destino não foi cadastrado por você!");
                return;
            }

            return avaliacaoModel.cadastrar(nota, comentario, pontoTuristico.trim(), idDestino, idUsuario)
                .then(function (resultadoCadastro) {
                    res.status(201).json({ idComentario: resultadoCadastro.insertId });
                });
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao cadastrar a avaliação! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function editar(req, res) {
    var idComentario = Number(req.params.idComentario);
    var idUsuario = Number(req.body.idUsuarioServer);
    var nota = Number(req.body.notaServer);
    var pontoTuristico = req.body.pontoTuristicoServer;
    var comentario = String(req.body.comentarioServer || "").trim();

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        res.status(401).send("Usuário não está logado!");
        return;
    }
    if (!Number.isInteger(idComentario) || idComentario <= 0) {
        res.status(400).send("Avaliação inválida!");
        return;
    }

    var erroValidacao = validarAvaliacao(nota, pontoTuristico, comentario);
    if (erroValidacao) {
        res.status(400).send(erroValidacao);
        return;
    }

    avaliacaoModel.editar(idComentario, idUsuario, nota, comentario, pontoTuristico.trim())
        .then(function (resultado) {
            if (resultado.affectedRows == 0) {
                res.status(404).send("Avaliação não encontrada!");
                return;
            }
            res.status(200).json({ idComentario: idComentario });
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao editar a avaliação! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar,
    cadastrar,
    editar
};