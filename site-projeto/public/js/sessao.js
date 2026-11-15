function verificarLogin() {
    var id = sessionStorage.ID_USUARIO;
    var email = sessionStorage.EMAIL_USUARIO;

    if (id == undefined || email == undefined) {
        alert("Você precisa fazer login para acessar esta página.");
        window.location.replace("/login.html");
        return false;
    }

    return true;
}

function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        if (b_usuario) {
            b_usuario.innerHTML = nome;
        }
    } else {
        window.location = "/login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "/login.html";
}

function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}
