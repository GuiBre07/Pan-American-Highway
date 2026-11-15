var database = require("../database/config");

function buscarUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT idCadastro FROM cadastro WHERE idCadastro = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select");
}

function cadastrar(pais, cidade, tempoEstadia) {
    var instrucaoSql = `
        INSERT INTO destino (pais, cidade, tempoEstadia) VALUES ('${pais}', '${cidade}', ${tempoEstadia});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    var instrucaoSql = `
        SELECT idDestino, pais, cidade, tempoEstadia FROM destino ORDER BY pais, cidade;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select");
}

module.exports = {
    buscarUsuario,
    cadastrar,
    listar
};
