var database = require("../database/config");

function buscarKpis(idUsuario) {
    var instrucaoSql = `
        SELECT COUNT(*) AS destinos,
               COUNT(DISTINCT pais) AS paises,
               IFNULL(SUM(tempoEstadia), 0) AS dias,
               (SELECT ROUND(AVG(c.nota), 1)
                  FROM comentario AS c
                  JOIN destino AS d2 ON d2.idDestino = c.fkDestino
                 WHERE d2.fkCadastro = ?) AS notaMedia,
               (SELECT COUNT(*)
                  FROM comentario AS c
                  JOIN destino AS d3 ON d3.idDestino = c.fkDestino
                 WHERE d3.fkCadastro = ?) AS avaliacoes
          FROM destino
         WHERE fkCadastro = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario, idUsuario, idUsuario]);
}

function buscarListaPaises(idUsuario) {
    var instrucaoSql = `
        SELECT pais
          FROM destino
         WHERE fkCadastro = ?
         GROUP BY pais
         ORDER BY pais;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario]);
}

function buscarPaisMaisDias(idUsuario) {
    var instrucaoSql = `
        SELECT pais, SUM(tempoEstadia) AS dias
          FROM destino
         WHERE fkCadastro = ?
         GROUP BY pais
         ORDER BY dias DESC
         LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario]);
}

function buscarDistribuicaoNotas(idUsuario) {
    var instrucaoSql = `
        SELECT ROUND(c.nota) AS estrelas, COUNT(*) AS quantidade
          FROM comentario AS c
          JOIN destino AS d ON d.idDestino = c.fkDestino
         WHERE d.fkCadastro = ?
         GROUP BY ROUND(c.nota);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario]);
}

function buscarAvaliacoesPorMes(idUsuario) {
    var instrucaoSql = `
        SELECT DATE_FORMAT(c.dtAvaliacao, '%Y-%m') AS mes, COUNT(*) AS quantidade
          FROM comentario AS c
          JOIN destino AS d ON d.idDestino = c.fkDestino
         WHERE d.fkCadastro = ?
           AND c.dtAvaliacao >= DATE_FORMAT(CURDATE() - INTERVAL 11 MONTH, '%Y-%m-01')
         GROUP BY mes
         ORDER BY mes;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario]);
}

function buscarTopPontos(idUsuario) {
    var instrucaoSql = `
        SELECT c.pontoTuristico, c.nota, d.cidade, d.pais
          FROM comentario AS c
          JOIN destino AS d ON d.idDestino = c.fkDestino
         WHERE d.fkCadastro = ?
         ORDER BY c.nota DESC, c.dtAvaliacao DESC
         LIMIT 3;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario]);
}

function buscarNotaPorPais(idUsuario) {
    var instrucaoSql = `
        SELECT d.pais,
               ROUND(AVG(c.nota), 1) AS media,
               COUNT(DISTINCT d.idDestino) AS qtdDestinos
          FROM comentario AS c
          JOIN destino AS d ON d.idDestino = c.fkDestino
         WHERE d.fkCadastro = ?
         GROUP BY d.pais
         ORDER BY media DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario]);
}

function buscarCidadesAvaliadas(idUsuario) {
    var instrucaoSql = `
        SELECT d.pais, d.cidade
          FROM comentario AS c
          JOIN destino AS d ON d.idDestino = c.fkDestino
         WHERE d.fkCadastro = ?
         GROUP BY d.pais, d.cidade
         ORDER BY d.pais, d.cidade;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario]);
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
