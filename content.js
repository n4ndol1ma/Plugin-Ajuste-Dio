/**
 * DIO Theater Mode - Content Script
 * 
 * Este arquivo é injetado diretamente na página da DIO (web.dio.me).
 * Ele gerencia a manipulação do DOM para expandir o vídeo e esconder distrações.
 * 
 * @author Fernando Lima (https://github.com/n4ndol1ma)
 */

let isTheaterMode = false; // Estado global da extensão na aba atual
let observer = null;       // Instância do MutationObserver
let debounceTimer = null;  // Timer para evitar execuções excessivas (performance)

/**
 * Remove todos os atributos personalizados injetados pela extensão.
 * Essencial para restaurar o layout original da DIO sem precisar recarregar a página.
 */
function clearZenMode() {
    const selectors = [
        '[data-dio-zen-media]',
        '[data-dio-zen-parent]',
        '[data-dio-zen-hidden]'
    ];
    
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            const attr = selector.replace('[', '').replace(']', '').split('=')[0];
            el.removeAttribute(attr);
        });
    });
}

/**
 * Lógica principal de expansão do vídeo.
 * Identifica o player (Video HTML5 ou Iframe do YouTube) e escala os elementos pais.
 */
function applyZenMode() {
    // Busca os principais seletores de mídia usados na plataforma
    const media = document.querySelector('video, iframe[src*="youtube"]');
    
    if (!media || !isTheaterMode) return;

    // Limpeza preventiva para garantir que novos elementos da página sejam processados corretamente
    clearZenMode();

    // Configuração do elemento de mídia (Rei da Tela)
    media.setAttribute('data-dio-zen-media', 'true');
    
    // Habilita controles nativos caso seja um elemento <video>
    if (media.tagName.toLowerCase() === 'video') {
        media.setAttribute('controls', 'true');
    }

    let current = media;
    
    /**
     * Algoritmo de Subida Hierárquica:
     * Percorremos a árvore do DOM de baixo para cima (bottom-up),
     * marcando os pais para expansão e os irmãos para ocultação.
     */
    while (current && current.parentElement && current !== document.body) {
        let parent = current.parentElement;
        
        // Marca o container pai para herdar o layout full-screen via CSS
        parent.setAttribute('data-dio-zen-parent', 'true');
        
        // Oculta todos os elementos irmãos (Playlists, Menus, Chat, etc)
        Array.from(parent.children).forEach(child => {
            if (child !== current) {
                child.setAttribute('data-dio-zen-hidden', 'true');
            }
        });
        
        current = parent;
    }
}

/**
 * Inicializa o observador de mutações do DOM.
 * Necessário porque a DIO é uma Single Page Application (SPA). Quando o usuário
 * troca de aula, o DOM muda sem recarregar a página.
 */
function startObserver() {
    if (!observer) {
        observer = new MutationObserver(() => {
            if (isTheaterMode) {
                // Debounce: Aguarda 250ms após a última mudança para re-aplicar o modo zen
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => applyZenMode(), 250);
            }
        });
        
        // Observa mudanças na estrutura (childList) e em toda a árvore (subtree)
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

/**
 * Listener de Mensagens da Extensão
 * Recebe o comando de "toggle" disparado pelo clique no ícone da extensão.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggle") {
        isTheaterMode = !isTheaterMode;
        
        if (isTheaterMode) {
            document.body.classList.add('dio-theater-mode');
            applyZenMode();
            startObserver();
        } else {
            document.body.classList.remove('dio-theater-mode');
            
            // Desativa o observer para economizar recursos de CPU
            if (observer) {
                observer.disconnect();
                observer = null;
            }
            
            clearZenMode(); // Restaura o layout original instantaneamente
        }
        
        sendResponse({ status: "ok", mode: isTheaterMode });
    }
    return true; // Mantém o canal de comunicação aberto para respostas assíncronas
});
