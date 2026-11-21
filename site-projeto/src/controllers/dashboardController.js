var dashboardModel = require("../models/dashboardModel");

function idValido(idUsuario) {
    return Number.isInteger(idUsuario) && idUsuario > 0;
}

function buscarKpis(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    }

    console.log(`Recuperando os KPIs da dashboard do usuário ${idUsuario}`);

    dashboardModel.buscarKpis(idUsuario).then(function (resultado) {
        res.status(200).json(resultado[0]);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os KPIs.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarListaPaises(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    }

    console.log(`Recuperando a lista de países do usuário ${idUsuario}`);

    dashboardModel.buscarListaPaises(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a lista de países.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPaisMaisDias(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    }

    console.log(`Recuperando o país com mais dias do usuário ${idUsuario}`);

    dashboardModel.buscarPaisMaisDias(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o país com mais dias.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDistribuicaoNotas(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    }

    console.log(`Recuperando a distribuição de notas do usuário ${idUsuario}`);

    dashboardModel.buscarDistribuicaoNotas(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a distribuição de notas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarAvaliacoesPorMes(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    }

    console.log(`Recuperando as avaliações por mês do usuário ${idUsuario}`);

    dashboardModel.buscarAvaliacoesPorMes(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as avaliações por mês.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarTopPontos(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    }

    console.log(`Recuperando os pontos turísticos mais bem avaliados do usuário ${idUsuario}`);

    dashboardModel.buscarTopPontos(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os pontos turísticos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarNotaPorPais(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    }

    console.log(`Recuperando a nota média por país do usuário ${idUsuario}`);

    dashboardModel.buscarNotaPorPais(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a nota por país.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarCidadesAvaliadas(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    }

    console.log(`Recuperando as cidades avaliadas do usuário ${idUsuario}`);

    dashboardModel.buscarCidadesAvaliadas(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as cidades avaliadas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarKpis,
    buscarListaPaises,
    buscarCidadesAvaliadas,
    buscarPaisMaisDias,
    buscarDistribuicaoNotas,
    buscarAvaliacoesPorMes,
    buscarTopPontos,
    buscarNotaPorPais
};
