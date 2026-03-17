// ==== NAVEGAÇÃO SUAVE ====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==== LÓGICA DO FLUXO DO JOGO ====
const btnJogarAgora = document.getElementById('btn-jogar-agora');
const modalCadastro = document.getElementById('modal-cadastro');
const formCadastro = document.getElementById('form-cadastro');
const telaHome = document.getElementById('tela-home');
const telaJogo = document.getElementById('tela-jogo');

// 1. Abre o modal "Quem é você" ao clicar em Jogar Agora
btnJogarAgora.addEventListener('click', () => {
    modalCadastro.style.display = 'flex';
});

// 2. Quando o usuário preenche o form e clica em "JOGAR"
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita recarregar a página
    
    // Esconde o modal e a Home, mostra a Tela do Jogo
    modalCadastro.style.display = 'none';
    telaHome.style.display = 'none';
    telaJogo.style.display = 'block';
    
    // Aqui você enviaria os dados (Nome, Email, Zap) para seu banco de dados
    console.log("Usuário cadastrado e redirecionado para o jogo!");
});

// 3. Voltar da tela do jogo para a Home
function voltarParaHome() {
    telaJogo.style.display = 'none';
    telaHome.style.display = 'block';
    window.scrollTo(0, 0); // Volta pro topo
}

// ==== CONTROLE DE MODAIS GENÉRICOS ====
function fecharModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function abrirFeedback() {
    document.getElementById('modal-feedback').style.display = 'flex';
}

// Fecha modal se clicar fora da caixa branca
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// ==== LÓGICA DO CARROSSEL (HANDS ON) ====
// "A cada imagem o texto muda"
const slideData = [
    { title: "Mecânica Realista", desc: "A física do jogo permite movimentos precisos e realistas." },
    { title: "Gráficos Incríveis", desc: "Ambientes detalhados que imergem o jogador na história." },
    { title: "Multiplayer", desc: "Jogue com amigos em servidores dedicados e ranqueados." }
];

let currentSlide = 0;
const carouselTitle = document.getElementById('carousel-title');
const carouselDesc = document.getElementById('carousel-desc');
const carouselImg = document.getElementById('carousel-img'); // Placeholder da imagem
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

function updateCarousel() {
    carouselTitle.textContent = slideData[currentSlide].title;
    carouselDesc.textContent = slideData[currentSlide].desc;
    carouselImg.textContent = `Imagem ${currentSlide + 1}`; // Apenas para visualização no placeholder
}

btnNext.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slideData.length;
    updateCarousel();
});

btnPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slideData.length) % slideData.length;
    updateCarousel();
});

// Inicializa o primeiro slide
updateCarousel();