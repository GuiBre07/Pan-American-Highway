var database = require("../database/config");

function listar(idUsuario) {
    var instrucaoSql = `
        SELECT c.idComentario,
               c.nota,
               c.comentario,
               c.pontoTuristico,
               DATE_FORMAT(c.dtAvaliacao, '%d/%m/%Y') AS data,
               c.fkDestino
          FROM comentario AS c
          JOIN destino AS d ON d.idDestino = c.fkDestino
         WHERE d.fkCadastro = ?
         ORDER BY c.dtAvaliacao;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idUsuario]);
}

function verificarDono(idDestino, idUsuario) {
    var instrucaoSql = `
        SELECT idDestino FROM destino WHERE idDestino = ? AND fkCadastro = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [idDestino, idUsuario]);
}

function cadastrar(nota, comentario, pontoTuristico, idDestino, idUsuario) {
    var instrucaoSql = `
        INSERT INTO comentario (nota, comentario, pontoTuristico, fkDestino, fkCadastro)
        VALUES (?, ?, ?, ?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "insert", [nota, comentario, pontoTuristico, idDestino, idUsuario]);
}

function editar(idComentario, idUsuario, nota, comentario, pontoTuristico) {
    var instrucaoSql = `
        UPDATE comentario
           SET nota = ?, comentario = ?, pontoTuristico = ?
         WHERE idComentario = ? AND fkCadastro = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "update", [nota, comentario, pontoTuristico, idComentario, idUsuario]);
}

module.exports = {
    listar,
    verificarDono,
    cadastrar,
    editar
};