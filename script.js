// 1. LÓGICA DO DESCONTO DE R$ 9,90 (Aparece após 25s ou na saída)
const TEMPO_ESPERA_SEGUNDOS = 25;
let popupMostrado = false;

function mostrarDesconto() {
    if (popupMostrado) return;
    document.getElementById('exit-popup').classList.remove('hidden');
    popupMostrado = true;
}

// Dispara o popup de R$ 9,90 automaticamente após 25 segundos
setTimeout(mostrarDesconto, TEMPO_ESPERA_SEGUNDOS * 1000);

// Dispara o popup se a pessoa tentar sair antes dos 25 segundos (Desktop)
document.addEventListener('mouseleave', e => {
    if(e.clientY < 0) mostrarDesconto();
});

// Dispara o popup se a pessoa rolar rápido pra cima (Mobile)
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
   let st = window.pageYOffset || document.documentElement.scrollTop;
   if (st < lastScrollTop - 60 && st < 300) {
      mostrarDesconto();
   }
   lastScrollTop = st <= 0 ? 0 : st; 
}, { passive: true });

// Botão de fechar o Popup
document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('exit-popup').classList.add('hidden');
});


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
    if (vagas > 2) { 
        vagas--;
        vagasEl.innerText = vagas + " Vagas";
        vagasEl.style.opacity = 0;
        setTimeout(() => vagasEl.style.opacity = 1, 200);
    }
}, 12000);


// 4. NOTIFICAÇÕES FAKE DE VENDAS
const nomes = ["Ana P.", "Marcos S.", "João V.", "Carla M.", "Felipe R.", "Juliana T."];
const notification = document.getElementById('sales-notification');

setInterval(() => {
    document.getElementById('notify-name').innerText = nomes[Math.floor(Math.random() * nomes.length)];
    document.getElementById('notify-img').src = `https://i.pravatar.cc/100?img=${Math.floor(Math.random()*70)}`;
    
    notification.classList.remove('hidden');
    setTimeout(() => notification.classList.add('hidden'), 4000);
}, 16000);