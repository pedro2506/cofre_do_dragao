# 🐉 Cofre do Dragão 

O **Cofre do Dragão** é um gerenciador de fichas de personagem para Dungeons & Dragons 5ª Edição, projetado com uma abordagem **Mobile-First** e **Premium Aesthetics**. Ele oferece uma experiência imersiva e rápida para jogadores que precisam de agilidade durante as sessões de RPG.

![Preview do Projeto](https://pedro2506.github.io/cofre_do_dragao/avatars/tank.png)

## 🚀 Funcionalidades

- **Gestão de Personagens:** Crie e gerencie múltiplas fichas com persistência local.
- **Arquétipos Dinâmicos:** Escolha entre Tanque, Mago, Assassino, Investigador ou Temático para iniciar sua ficha instantaneamente.
- **Motor de Regras 5E:** Cálculos automáticos de modificadores, bônus de proficiência, CA e perícias.
- **Grimório Arcano:** Sistema de magias integrado e modular.
- **Save Game (JSON):** Exporte e importe suas fichas para manter backups ou trocar de dispositivo.
- **PWA (Suporte Offline):** Instale o aplicativo no seu celular e use-o mesmo sem conexão com a internet.
- **Design Imersivo:** Layout temático "Vault" com animações fluidas (Framer Motion).

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Estado Global:** [Zustand](https://docs.pmnd.rs/zustand/)
- **Banco de Dados (Local):** [Dexie.js](https://dexie.org/) (IndexedDB)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **PWA:** [Vite Plugin PWA](https://vite-pwa-org.netlify.app/)

## 📂 Estrutura do Projeto

```text
src/
├── components/          # Componentes de UI (Layout, Character, etc)
├── db/                  # Configuração do Dexie (IndexedDB)
├── hooks/               # Hooks customizados
├── rules/               # Motor de regras D&D 5E e configurações de arquétipos
├── store/               # Estado global com Zustand
├── types/               # Definições de tipos TypeScript
└── utils/               # Funções utilitárias (Serialização, Cálculos)
```

## 💻 Como rodar o projeto

1.  Clone este repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## 👨‍💻 Desenvolvedor

**Pedro Miranda**

- 🐙 **GitHub:** [pedro2506](https://github.com/pedro2506)
- 🔗 **LinkedIn:** [Pedro Miranda](https://www.linkedin.com/in/pedro-miranda)
- 📧 **Email:** [t3pedropaulo@gmail.com](mailto:t3pedropaulo@gmail.com)

---
💬 *Projeto criado com fins educacionais e para portfólio.*
