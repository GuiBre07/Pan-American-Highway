var database = require("../database/config");

function listarPaises(idUsuario) {
    var instrucaoSql = `
        SELECT pais, COUNT(*) AS qtdCidades
          FROM destino
         WHERE fkCadastro = ?
         GROUP BY pais
         ORDER BY pais;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario]);
}

function buscarKpis(idUsuario, pais) {
    var instrucaoSql = `
        SELECT dest.diasPais,
               (SELECT IFNULL(SUM(tempoEstadia), 0) FROM destino WHERE fkCadastro = ?) AS diasTotal,
               aval.pontos,
               aval.cidadesAvaliadas,
               aval.notaMedia,
               aval.avaliacoes
          FROM (SELECT IFNULL(SUM(tempoEstadia), 0) AS diasPais
                  FROM destino
                 WHERE fkCadastro = ? AND pais = ?) AS dest
         CROSS JOIN
               (SELECT COUNT(DISTINCT IF(c.pontoTuristico = '', NULL, c.pontoTuristico)) AS pontos,
                       COUNT(DISTINCT c.fkDestino) AS cidadesAvaliadas,
                       ROUND(AVG(c.nota), 1) AS notaMedia,
                       COUNT(*) AS avaliacoes
                  FROM comentario AS c
                  JOIN destino AS d ON d.idDestino = c.fkDestino
                 WHERE d.fkCadastro = ? AND d.pais = ?) AS aval;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario, idUsuario, pais, idUsuario, pais]);
}

function buscarCidades(idUsuario, pais) {
    var instrucaoSql = `
        SELECT cidade
          FROM destino
         WHERE fkCadastro = ? AND pais = ?
         ORDER BY cidade;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario, pais]);
}

function buscarMediasPaises(idUsuario) {
    var instrucaoSql = `
        SELECT d.pais, ROUND(AVG(c.nota), 1) AS media
          FROM comentario AS c
          JOIN destino AS d ON d.idDestino = c.fkDestino
         WHERE d.fkCadastro = ?
         GROUP BY d.pais
         ORDER BY media DESC, d.pais;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario]);
}

function buscarCidadeMaisDias(idUsuario, pais) {
    var instrucaoSql = `
        SELECT cidade, tempoEstadia AS dias
          FROM destino
         WHERE fkCadastro = ? AND pais = ?
         ORDER BY tempoEstadia DESC
         LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario, pais]);
}

function buscarDistribuicaoNotas(idUsuario, pais) {
    var instrucaoSql = `
        SELECT ROUND(c.nota) AS estrelas, COUNT(*) AS quantidade
          FROM comentario AS c
          JOIN destino AS d ON d.idDestino = c.fkDestino
         WHERE d.fkCadastro = ? AND d.pais = ?
         GROUP BY ROUND(c.nota);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario, pais]);
}

function buscarAvaliacoesPorMes(idUsuario, pais) {
    var instrucaoSql = `
        SELECT DATE_FORMAT(c.dtAvaliacao, '%Y-%m') AS mes, COUNT(*) AS quantidade
          FROM comentario AS c
          JOIN destino AS d ON d.idDestino = c.fkDestino
         WHERE d.fkCadastro = ? AND d.pais = ?
           AND c.dtAvaliacao >= DATE_FORMAT(CURDATE() - INTERVAL 11 MONTH, '%Y-%m-01')
         GROUP BY mes
         ORDER BY mes;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario, pais]);
}

function buscarTopPontos(idUsuario, pais) {
    var instrucaoSql = `
        SELECT c.pontoTuristico, c.nota, d.cidade
          FROM comentario AS c
          JOIN destino AS d ON d.idDestino = c.fkDestino
         WHERE d.fkCadastro = ? AND d.pais = ?
         ORDER BY c.nota DESC, c.dtAvaliacao DESC
         LIMIT 3;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario, pais]);
}

function buscarNotaPorCidade(idUsuario, pais) {
    var instrucaoSql = `
        SELECT d.cidade,
               ROUND(AVG(c.nota), 1) AS media,
               COUNT(c.idComentario) AS avaliacoes,
               d.tempoEstadia AS dias
          FROM destino AS d
          JOIN comentario AS c ON c.fkDestino = d.idDestino
         WHERE d.fkCadastro = ? AND d.pais = ?
         GROUP BY d.idDestino, d.cidade, d.tempoEstadia
         ORDER BY media DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario, pais]);
}

module.exports = {
    listarPaises,
    buscarKpis,
    buscarCidades,
    buscarMediasPaises,
    buscarCidadeMaisDias,
    buscarDistribuicaoNotas,
    buscarAvaliacoesPorMes,
    buscarTopPontos,
    buscarNotaPorCidade
};
