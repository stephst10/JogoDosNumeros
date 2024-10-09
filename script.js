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
    const inputPalpite = document.getElementById('palpite');
    const resultado = document.getElementById('resultado');
    const tentativasDisplay = document.getElementById('tentativas');

    botaoEnviar.addEventListener('click', async () => {
        try {
            const palpite = parseInt(inputPalpite.value);
            const mensagem = await verificarPalpite(palpite);
            resultado.textContent = mensagem;
            tentativasDisplay.textContent = `Tentativas: ${tentativas}`;
            inputPalpite.value = '';

            if (mensagem.includes('acertou')) {
                tentativas = 0;
                resultado.textContent += ' O jogo será reiniciado!';
                await gerarNumeroAleatorio();
                tentativasDisplay.textContent = "";
            }
        }  catch (erro) {
            resultado.textContent = erro;
        }
    })
}

window.onload = iniciarJogo;