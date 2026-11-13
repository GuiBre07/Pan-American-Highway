var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT c.idCadastro AS id, c.nome, c.email
            FROM login AS l
            JOIN cadastro AS c ON c.email = l.login
            WHERE l.login = '${email}' AND l.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, "select");
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cpf);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    // 1º INSERT: dados pessoais na tabela cadastro (sem a senha)
    var instrucaoSqlCadastro = `
        INSERT INTO cadastro (nome, email, cpf) VALUES ('${nome}', '${email}', '${cpf}');
    `;

    // 2º INSERT: credenciais na tabela login (o email cadastrado vira o login)
    var instrucaoSqlLogin = `
        INSERT INTO login (login, senha) VALUES ('${email}', '${senha}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSqlCadastro);
    return database.executar(instrucaoSqlCadastro)
        .then(function () {
            console.log("Executando a instrução SQL: \n" + instrucaoSqlLogin);
            return database.executar(instrucaoSqlLogin);
        });
}

module.exports = {
    autenticar,
    cadastrar
};