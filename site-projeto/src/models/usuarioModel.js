var database = require("../database/config")

// Os valores digitados pelo usuário vão separados da instrução (nos "?"),
// assim o MySQL trata cada um como texto e não como parte do comando SQL.
// Isso impede ataques de SQL injection.

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email)
    var instrucaoSql = `
        SELECT c.idCadastro AS id, c.nome, c.email
            FROM login AS l
            JOIN cadastro AS c ON c.email = l.login
            WHERE l.login = ? AND l.senha = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select", [email, senha]);
}

function cadastrar(nome, email, senha, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, cpf);

    var instrucaoSqlCadastro = `
        INSERT INTO cadastro (nome, email, cpf) VALUES (?, ?, ?);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSqlCadastro);
    return database.executar(instrucaoSqlCadastro, "insert", [nome, email, cpf])
        .then(function (resultadoCadastro) {
            var idCadastro = resultadoCadastro.insertId;

            var instrucaoSqlLogin = `
                INSERT INTO login (login, senha, fkCadastro) VALUES (?, ?, ?);
            `;

            console.log("Executando a instrução SQL: \n" + instrucaoSqlLogin);
            return database.executar(instrucaoSqlLogin, "insert", [email, senha, idCadastro]);
        });
}

module.exports = {
    autenticar,
    cadastrar
};
