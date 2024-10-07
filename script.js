let numeroSecreto;
let tentativas = 0;

function gerarNumeroAleatorio() {
    return new Promise((resolve) => {
        setTimeout(() => {
            numeroSecreto = Math.floor(Math.random() * 100) + 1;
            resolve(numeroSecreto);
        }, 1000);
    })
}

function verificarPalpite(palpite) {
    return new Promise((resolve, reject) => {
        tentativas++;
        if (palpite < 1 || palpite > 100) {
            reject("Por favor digite um número entre 1 e 100.")
        } else if (palpite === numeroSecreto) {
            resolve("Parabéns, você acertou!")
        } else if (palpite < numeroSecreto) {
            resolve("Muito baixo! Tente novamente.")
        } else {
            resolve("Muito alto! Tente novamente.")
        }
    })
}

async function iniciarJogo() {
    await gerarNumeroAleatorio();
    
    const botaoEnviar = document.getElementById('enviar');
}

window.onload = iniciarJogo;