# DIO Theater Mode 🎭

> [!IMPORTANT]
> **⚠️ Aviso Importante: Modo Desenvolvedor Necessário**
> Por se tratar de uma extensão instalada localmente (unpacked) que manipula o layout da página, o navegador pode tratá-la como um "falso-positivo" de segurança. Para que o plugin funcione normalmente, **mantenha o "Modo do Desenvolvedor" ativado** em `chrome://extensions/`.

Uma extensão leve e profissional para transformar sua experiência de aprendizado na plataforma **DIO (Digital Innovation One)**. Com um único clique, remova distrações e foque 100% no conteúdo do vídeo através do **Modo Teatro/Zen**.

---

## 🚀 O que este projeto faz?

Muitas vezes, a interface da plataforma pode conter elementos que distraem ou limitam o tamanho do vídeo em telas menores. Esta extensão:
- **Expande o vídeo** para ocupar 100% da aba do navegador.
- **Remove distrações** como menus, playlists e headers temporariamente.
- **Mantém a automação**: Funciona mesmo quando a DIO pula para a próxima aula automaticamente.
- **Preserva a performance**: Código otimizado com *debounce* e *MutationObserver* para não pesar no navegador.

## 🛠️ Tecnologias Utilizadas

- **JavaScript (ES6+)**: Lógica principal de manipulação do DOM.
- **CSS3**: Estilização profunda com seletores de atributo para garantir a quebra de layouts complexos (React/Styled Components).
- **Chrome Extension API (Manifest V3)**: O padrão mais moderno e seguro para extensões de navegador.

## 📦 Como instalar (Modo Desenvolvedor)

Como este é um projeto de código aberto para a comunidade, você pode instalá-lo manualmente:

1. Faça o download ou clone este repositório:
   ```bash
   git clone https://github.com/n4ndol1ma/plugin-ajuste-dio.git
   ```
2. Abra o seu navegador (Chrome, Edge, Opera, Brave, etc).
3. Vá para a página de extensões (`chrome://extensions/`).
4. Ative o **"Modo do desenvolvedor"** no canto superior direito.
5. Clique em **"Carregar sem compactação"** e selecione a pasta deste projeto.
6. Pronto! Agora basta clicar no ícone da extensão enquanto estiver assistindo uma aula na DIO.

## 👨‍💻 Estrutura do Código

Para os entusiastas e alunos que querem aprender com o código:

- `manifest.json`: O "RG" da extensão. Define permissões e arquivos.
- `background.js`: O "cérebro" que roda em segundo plano, ouvindo o clique no ícone.
- `content.js`: O "músculo". Injeta a lógica diretamente na página da DIO.
- `style.css`: A "maquiagem". Define as regras visuais que forçam o vídeo a ficar em tela cheia.

## 🤝 Contribuindo

Sinta-se à vontade para abrir uma *Issue* ou enviar um *Pull Request*. Toda ajuda para melhorar a experiência de estudo da nossa comunidade é bem-vinda!

---

Desenvolvido com ☕ e focado em produtividade por [Fernando Lima](https://github.com/n4ndol1ma).
