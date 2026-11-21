var dashboardPaisModel = require("../models/dashboardPaisModel");

function idValido(idUsuario) {
    return Number.isInteger(idUsuario) && idUsuario > 0;
}

function listarPaises(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    }

    console.log(`Recuperando os países cadastrados do usuário ${idUsuario}`);

    dashboardPaisModel.listarPaises(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao listar os países.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarKpis(req, res) {
    var idUsuario = Number(req.params.idUsuario);
    var pais = req.params.pais;

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    } else if (!pais) {
        res.status(400).send("País não informado!");
        return;
    }

    console.log(`Recuperando os KPIs de ${pais} do usuário ${idUsuario}`);

    dashboardPaisModel.buscarKpis(idUsuario, pais).then(function (resultado) {
        res.status(200).json(resultado[0]);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os KPIs do país.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarCidades(req, res) {
    var idUsuario = Number(req.params.idUsuario);
    var pais = req.params.pais;

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    } else if (!pais) {
        res.status(400).send("País não informado!");
        return;
    }

    console.log(`Recuperando as cidades de ${pais} do usuário ${idUsuario}`);

    dashboardPaisModel.buscarCidades(idUsuario, pais).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as cidades do país.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPosicao(req, res) {
    var idUsuario = Number(req.params.idUsuario);
    var pais = req.params.pais;

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    } else if (!pais) {
        res.status(400).send("País não informado!");
        return;
    }

    console.log(`Recuperando a posição de ${pais} entre os países do usuário ${idUsuario}`);

    dashboardPaisModel.buscarMediasPaises(idUsuario).then(function (resultado) {
        var posicao = 0;
        resultado.forEach(function (linha, i) {
            if (linha.pais === pais) posicao = i + 1;
        });

        res.status(200).json({ posicao: posicao, totalPaises: resultado.length });
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a posição do país.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarCidadeMaisDias(req, res) {
    var idUsuario = Number(req.params.idUsuario);
    var pais = req.params.pais;

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    } else if (!pais) {
        res.status(400).send("País não informado!");
        return;
    }

    console.log(`Recuperando a cidade com mais dias em ${pais} do usuário ${idUsuario}`);

    dashboardPaisModel.buscarCidadeMaisDias(idUsuario, pais).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a cidade com mais dias.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDistribuicaoNotas(req, res) {
    var idUsuario = Number(req.params.idUsuario);
    var pais = req.params.pais;

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    } else if (!pais) {
        res.status(400).send("País não informado!");
        return;
    }

    console.log(`Recuperando a distribuição de notas de ${pais} do usuário ${idUsuario}`);

    dashboardPaisModel.buscarDistribuicaoNotas(idUsuario, pais).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a distribuição de notas do país.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarAvaliacoesPorMes(req, res) {
    var idUsuario = Number(req.params.idUsuario);
    var pais = req.params.pais;

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    } else if (!pais) {
        res.status(400).send("País não informado!");
        return;
    }

    console.log(`Recuperando as avaliações por mês de ${pais} do usuário ${idUsuario}`);

    dashboardPaisModel.buscarAvaliacoesPorMes(idUsuario, pais).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as avaliações por mês do país.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarTopPontos(req, res) {
    var idUsuario = Number(req.params.idUsuario);
    var pais = req.params.pais;

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    } else if (!pais) {
        res.status(400).send("País não informado!");
        return;
    }

    console.log(`Recuperando os melhores pontos turísticos de ${pais} do usuário ${idUsuario}`);

    dashboardPaisModel.buscarTopPontos(idUsuario, pais).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os pontos turísticos do país.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarNotaPorCidade(req, res) {
    var idUsuario = Number(req.params.idUsuario);
    var pais = req.params.pais;

    if (!idValido(idUsuario)) {
        res.status(400).send("Usuário inválido!");
        return;
    } else if (!pais) {
        res.status(400).send("País não informado!");
        return;
    }

    console.log(`Recuperando a nota por cidade de ${pais} do usuário ${idUsuario}`);

    dashboardPaisModel.buscarNotaPorCidade(idUsuario, pais).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a nota por cidade.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listarPaises,
    buscarKpis,
    buscarCidades,
    buscarPosicao,
    buscarCidadeMaisDias,
    buscarDistribuicaoNotas,
    buscarAvaliacoesPorMes,
    buscarTopPontos,
    buscarNotaPorCidade
};
