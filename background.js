/**
 * DIO Theater Mode - Background Script
 * 
 * Atua como o "Service Worker" da extensão, rodando em background para capturar
 * o clique no ícone da extensão na barra de ferramentas e enviar comandos
 * para o Content Script da página ativa.
 * 
 * @author Fernando Lima (https://github.com/n4ndol1ma)
 */

chrome.action.onClicked.addListener((tab) => {
    // Verifica se a URL da aba ativa pertence ao domínio da DIO
    if (tab.url && tab.url.includes("web.dio.me")) {
        
        // Envia o comando de alternar (toggle) para o content.js
        chrome.tabs.sendMessage(tab.id, { action: "toggle" })
            .catch(() => {
                /**
                 * Mecanismo de Recuperação:
                 * Caso o content script não esteja carregado (ex: página recém aberta ou cache),
                 * injetamos os arquivos manualmente antes de enviar a mensagem novamente.
                 */
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ["content.js"]
                }).then(() => {
                    chrome.tabs.sendMessage(tab.id, { action: "toggle" });
                });
            });
    }
});
