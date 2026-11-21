var database = require("../database/config");

// Os valores vão nos "?" e são enviados separados da instrução,
// o que protege contra SQL injection e aceita textos com apóstrofo (ex.: Côte d'Ivoire).

function buscarUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT idCadastro FROM cadastro WHERE idCadastro = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario]);
}

function cadastrar(pais, cidade, tempoEstadia, idUsuario) {
    var instrucaoSql = `
        INSERT INTO destino (pais, cidade, tempoEstadia, fkCadastro) VALUES (?, ?, ?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "insert", [pais, cidade, tempoEstadia, idUsuario]);
}

function listar(idUsuario) {
    var instrucaoSql = `
        SELECT idDestino, pais, cidade, tempoEstadia FROM destino WHERE fkCadastro = ? ORDER BY pais, cidade;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario]);
}

module.exports = {
    buscarUsuario,
    cadastrar,
    listar
};
