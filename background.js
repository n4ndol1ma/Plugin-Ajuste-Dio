/**
 * DIO Theater Mode - Background Script
 * 
 * Escuta o clique no ícone da extensão e envia o comando para o content script.
 */

chrome.action.onClicked.addListener((tab) => {
    // Só envia mensagem se estiver no domínio correto
    if (tab.url && tab.url.includes("web.dio.me")) {
        chrome.tabs.sendMessage(tab.id, { action: "toggle" }).catch((err) => {
            console.log("Aguardando carregamento da página ou script...");
        });
    }
});
