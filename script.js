// 1. LÓGICA DO PITCH DELAY (Esconder a oferta por 25 segundos)
const TEMPO_ESPERA_SEGUNDOS = 25;
let ofertaRevelada = false;

function revelarOferta() {
    if (ofertaRevelada) return;
    ofertaRevelada = true;
    
    // Pega todos os elementos escondidos e faz eles aparecerem suavemente
    const elementosEscondidos = document.querySelectorAll('.pitch-hidden');
    elementosEscondidos.forEach(el => {
        el.classList.remove('pitch-hidden');
        el.classList.add('fade-in');
    });
}

// Inicia o cronômetro assim que a página carrega
setTimeout(revelarOferta, TEMPO_ESPERA_SEGUNDOS * 1000);


// 2. CONTADOR DE DINHEIRO AO VIVO
let revenue = 42150.00;
const revenueEl = document.getElementById('revenue-counter');

setInterval(() => {
    const increase = (Math.random() * (150 - 27) + 27);
    revenue += increase;
    revenueEl.innerText = revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    revenueEl.style.color = "#fff";
    setTimeout(() => revenueEl.style.color = "#00ff41", 300);
}, 3500);


// 3. VAGAS DIMINUINDO
let vagas = 14;
const vagasEl = document.getElementById('vagas-restantes');
setInterval(() => {
    if (vagas > 2 && ofertaRevelada) { // Só diminui vaga se a oferta já apareceu
        vagas--;
        vagasEl.innerText = vagas + " Vagas";
        vagasEl.style.opacity = 0;
        setTimeout(() => vagasEl.style.opacity = 1, 200);
    }
}, 12000);


// 4. NOTIFICAÇÕES FAKE
const nomes = ["Ana P.", "Marcos S.", "João V.", "Carla M.", "Felipe R.", "Juliana T."];
const notification = document.getElementById('sales-notification');

setInterval(() => {
    document.getElementById('notify-name').innerText = nomes[Math.floor(Math.random() * nomes.length)];
    document.getElementById('notify-img').src = `https://i.pravatar.cc/100?img=${Math.floor(Math.random()*70)}`;
    
    notification.classList.remove('hidden');
    setTimeout(() => notification.classList.add('hidden'), 4000);
}, 16000);


// 5. POPUP DE SAÍDA E REVELAÇÃO FORÇADA
let popupMostrado = false;

function acionarSaida() {
    if (!popupMostrado) {
        revelarOferta(); // Se a pessoa tentar sair antes dos 25s, revela a oferta na hora
        document.getElementById('exit-popup').classList.remove('hidden');
        popupMostrado = true;
    }
}

// Desktop: Mouse sai da tela
document.addEventListener('mouseleave', e => {
    if(e.clientY < 0) acionarSaida();
});

// Mobile: Rolagem rápida para cima
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
   let st = window.pageYOffset || document.documentElement.scrollTop;
   if (st < lastScrollTop - 60 && st < 300) {
      acionarSaida();
   }
   lastScrollTop = st <= 0 ? 0 : st; 
}, { passive: true });

// Fechar Popup
document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('exit-popup').classList.add('hidden');
});