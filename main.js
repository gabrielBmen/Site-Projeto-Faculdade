// =========================================================
// REQUISITO 7: Verificação Automatizada de Lançamento
// =========================================================
const paginaHome = document.getElementById("home");

// O alerta só vai aparecer se a "paginaHome" existir na tela atual
if (paginaHome) {
    const anoAtual = new Date().getFullYear();
    const constanteLancamento = 2026; 

    if (anoAtual === constanteLancamento) {
        alert("ALERTA DE SISTEMA: Grande Lançamento de Cyber Blaster este ano!");
    }
}

// =========================================================
// REQUISITO 1: Manipulação de Dados Estáticos (5 variáveis)
// =========================================================
const jogoNome = "Cyber Blaster: Neon Origins";
const jogoGenero = "Action Platformer 2D / Metroidvania";
const jogoDesenvolvedor = "Gabriel Barreto Men";
const jogoAno = 2026;
const jogoEngine = "HTML5 / JavaScript DOM";

// Injetando no HTML
// Usamos o operador de encadeamento opcional (?) para evitar erros se estiver em páginas que não tem a ficha
if(document.getElementById("info-title")) {
    document.getElementById("info-title").textContent = jogoNome;
    document.getElementById("info-genre").textContent = jogoGenero;
    document.getElementById("info-dev").textContent = jogoDesenvolvedor;
    document.getElementById("info-year").textContent = jogoAno;
    document.getElementById("info-engine").textContent = jogoEngine;
}

// =========================================================
// REQUISITO 2, 3 e 4: Prompt, Condicional e Blur
// =========================================================
const btnIdade = document.getElementById("checkAgeBtn");
const bossSecreto = document.getElementById("sensitive-content");
const avisoBlur = document.getElementById("blur-warning");

// Verifica se o usuário já fez o teste nesta sessão (para não perturbar a cada troca de página)
let testeIdadeRealizado = sessionStorage.getItem("idadeVerificada") === "true";

// Função que agrupa a lógica do prompt de idade
function realizarVerificacaoIdade(forcarRefazer = false) {
    // Se o teste já foi feito e o usuário clicou no botão, pergunta se quer alterar
    if (testeIdadeRealizado && forcarRefazer) {
        const desejaAlterar = confirm("Você já realizou a verificação de idade. Tem certeza que deseja alterar sua idade?");
        if (!desejaAlterar) return; // Cancela se o usuário desistir
    }

    // Prompt disparado
    const resposta = prompt("Conteúdo Sensível. Por favor, digite sua idade:");
    
    if (resposta !== null && resposta.trim() !== "") {
        const idade = parseInt(resposta);
        
        // Marca que o teste foi feito e salva na sessão do navegador
        testeIdadeRealizado = true; 
        sessionStorage.setItem("idadeVerificada", "true");
        
        // Estrutura Condicional (If/Else) e Alertas
        if (idade >= 18) {
            alert("Acesso liberado! Você agora pode visualizar o Boss Secreto.");
            if (bossSecreto) bossSecreto.style.filter = "blur(0px)"; // Remove o blur
            if (avisoBlur) avisoBlur.style.display = "none"; // Esconde o aviso
        } else {
            alert("Acesso negado! O design deste chefe é muito violento para menores de 18 anos.");
            if (bossSecreto) bossSecreto.style.filter = "blur(15px)"; // Aplica o blur
            if (avisoBlur) avisoBlur.style.display = "block"; // Mostra o aviso
        }
    }
}

// 1. Disparo Automático: Só acontece se estivermos na página Home e o teste ainda não foi feito
if (paginaHome && !testeIdadeRealizado) {
    // Um pequeno delay (500ms) para garantir que o site carregue visualmente antes do prompt travar a tela
    setTimeout(() => {
        realizarVerificacaoIdade(false);
    }, 500);
}

// 2. Disparo via clique no botão (agora no footer)
if (btnIdade) {
    btnIdade.addEventListener("click", () => {
        realizarVerificacaoIdade(true);
    });
}
// =========================================================
// REQUISITO 5: Interatividade com Input de Texto (Saudação)
// =========================================================
const greetInput = document.getElementById("greetInput");
const greetBtn = document.getElementById("greetBtn");
const greetMessage = document.getElementById("greetMessage");

if (greetBtn) {
    greetBtn.addEventListener("click", () => {
        const nomeJogador = greetInput.value.trim();
        if (nomeJogador) {
            greetMessage.textContent = `Bem-vindo à resistência, Agente ${nomeJogador}!`;
            greetMessage.style.color = "#00a2ff"; // Azul neon
        } else {
            greetMessage.textContent = "Por favor, insira um nome válido.";
            greetMessage.style.color = "#ff6b6b";
        }
    });
}

// =========================================================
// REQUISITO 6: Alternância de Tema (Light/Dark Mode)
// =========================================================
const themeBtn = document.getElementById("themeBtn");

// 1. Verifica a "memória" do navegador ao carregar a página
const temaSalvo = localStorage.getItem("cyberBlasterTheme");

// Se a memória diz que é "light", já aplica a classe imediatamente
if (temaSalvo === "light") {
    document.body.classList.add("light-mode");
    if (themeBtn) themeBtn.textContent = "Tema Escuro"; // Atualiza o texto do botão
} else {
    // Se for "dark" ou não tiver nada salvo, garante que o botão mostra "Tema Claro"
    if (themeBtn) themeBtn.textContent = "Tema Claro";
}

// 2. Ação do botão de trocar tema
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        // Altera a cor de fundo e do texto ativando a classe no body
        document.body.classList.toggle("light-mode");
        
        // Verifica qual tema ficou ativo após o clique
        if (document.body.classList.contains("light-mode")) {
            themeBtn.textContent = "Tema Escuro";
            // Salva na memória do navegador que o tema agora é claro
            localStorage.setItem("cyberBlasterTheme", "light");
        } else {
            themeBtn.textContent = "Tema Claro";
            // Salva na memória do navegador que o tema agora é escuro
            localStorage.setItem("cyberBlasterTheme", "dark");
        }
    });
}

// =========================================================
// COMPORTAMENTOS ORIGINAIS MANTIDOS
// =========================================================
const navButtons = document.querySelectorAll(".nav-btn:not(#themeBtn):not(#checkAgeBtn)");
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

const feedbackForm = document.getElementById("feedbackForm");
const formMessage = document.getElementById("formMessage");

if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        formMessage.textContent = "Preencha todos os campos para enviar o feedback.";
        formMessage.style.color = "#ff6b6b";
        return;
      }

      formMessage.textContent = `Obrigado, ${name}! Seu feedback foi enviado com sucesso.`;
      formMessage.style.color = "#8bff9c";
      feedbackForm.reset();
    });
    // =========================================================
// REQUISITO: Avaliações Dinâmicas e Feedback
// =========================================================
const feedbackForm = document.getElementById("feedbackForm");
const formMessage = document.getElementById("formMessage");
const reviewList = document.getElementById("reviewList");

if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        formMessage.textContent = "Preencha todos os campos para enviar o feedback.";
        formMessage.style.color = "#ff6b6b";
        return;
      }

      // 1. Cria um novo elemento (cartão de avaliação)
      const novaAvaliacao = document.createElement("article");
      novaAvaliacao.classList.add("review-card");

      // 2. Preenche o conteúdo HTML do cartão
      novaAvaliacao.innerHTML = `
          <h3>${name}</h3>
          <div class="stars">★★★★★</div>
          <p>“${message}”</p>
      `;

      // 3. Adiciona a nova avaliação no topo da lista (prepend)
      if (reviewList) {
          reviewList.prepend(novaAvaliacao);
      }

      // 4. Mensagem de sucesso
      formMessage.textContent = `Obrigado, ${name}! Sua avaliação foi publicada com sucesso.`;
      formMessage.style.color = "#8bff9c";
      
      // 5. Limpa o formulário
      feedbackForm.reset();
      
      // Remove a mensagem de sucesso depois de 4 segundos
      setTimeout(() => {
          formMessage.textContent = "";
      }, 4000);
    });
}

}