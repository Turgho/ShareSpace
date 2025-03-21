# ShareSpace 🌐

ShareSpace é uma plataforma de rede social inspirada no X (antigo Twitter), onde os usuários podem interagir, postar conteúdos, curtir e comentar postagens, seguir outros usuários e enviar mensagens diretas. Desenvolvida com tecnologias modernas, a ShareSpace oferece uma experiência interativa e intuitiva para seus usuários.

## 🚀 Funcionalidades

- **📝 Postagens**: Os usuários podem postar textos, links, fotos e vídeos.
- **👍 Curtidas e Comentários**: É possível curtir e comentar nas postagens.
- **⭐ Favoritos**: Os usuários podem salvar suas postagens favoritas.
- **👥 Seguir Usuários**: Permite que os usuários sigam uns aos outros para acompanhar as atualizações.
- **📩 Mensagens Diretas**: Enviar mensagens privadas para outros usuários.
- **👤 Perfil de Usuário**: Cada usuário possui um perfil onde podem armazenar informações como nome, e-mail, telefone, status e outros detalhes.

## 🛠️ Tecnologias Utilizadas

- **Backend**: NestJS (TypeScript)
- **Frontend**: Angular, Tailwind CSS
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (JSON Web Token)
- **Gerenciamento de Containers**: Docker

## 📋 Pré-requisitos

Antes de começar, verifique se você tem as seguintes ferramentas instaladas:

- **Node.js** (v14 ou superior)
- **Docker** (se for utilizar containers para o banco de dados)
- **PostgreSQL** (ou qualquer outro banco de dados compatível com Prisma)
- **NestJS CLI** (opcional, mas recomendado)

## 🛠️ Instalação

### 1. Clone o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/share-space.git
cd share-space
```

### 2. Instale as dependências

Instale as dependências do projeto:
```bash
npm install
```

### 3. Configuração do Banco de Dados

O ShareSpace utiliza o Prisma para gerenciar o banco de dados. Certifique-se de configurar as variáveis de ambiente do banco de dados no arquivo `.env`:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/sharespace_db"
SHADOW_DATABASE_URL="postgresql://user:password@localhost:5432/sharespace_shadow_db"
```

### 4. Rodar as Migrations

Execute as migrations do Prisma para criar as tabelas no banco de dados:

```bash
npx prisma migrate dev
```

### 5. Inicie o Servidor

Inicie o servidor de desenvolvimento:

```bash
npm run start:dev
```

### 6. Acessando a Aplicação

- O backend pode ser acessado através de `http://localhost:3000`.
- O frontend pode ser configurado com Angular e Tailwind CSS para o design responsivo.

## 🤝 Contribuindo

- Faça o fork do repositório.
- Crie uma nova branch (git checkout -b feature/novidade).
- Faça as alterações e commit.
- Envie para o seu fork (git push origin feature/novidade).
- Crie um pull request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.