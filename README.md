# Gerenciador de Tarefas 📝

O **Gerenciador de Tarefas** é um sistema desenvolvido para facilitar o gerenciamento e organização de tarefas. Ele oferece funcionalidades essenciais para a criação, edição, visualização e exclusão de tarefas, permitindo que diferentes tipos de usuários tenham controle adequado sobre suas atividades.

O sistema é dividido em dois tipos de usuários:
- **Admin**: Tem permissões completas para gerenciar todas as tarefas e usuários.
- **Member**: Pode criar, visualizar e editar apenas suas próprias tarefas.

## 📌 Funcionalidades Principais

- **Autenticação de Usuários**: Login seguro com JWT (JSON Web Token).
- **Criação de Tarefas**: Definição de título, descrição, status e prazo de conclusão.
- **Edição de Tarefas**: Alteração dos detalhes das tarefas criadas.
- **Exclusão de Tarefas**: Apenas administradores podem remover tarefas.
- **Listagem de Tarefas**: 
  - Admins podem visualizar todas as tarefas cadastradas.
  - Members podem ver apenas suas próprias tarefas.
- **Controle de Acesso**: Diferentes níveis de permissão garantem segurança no gerenciamento das tarefas.
- **Persistência de Dados**: Banco de dados MySQL utilizando Prisma ORM.
- **API RESTful**: Sistema expõe endpoints para integração com outras aplicações.
- **Ambiente Containerizado**: Utilização de Docker e Docker Compose para facilitar a configuração e execução do projeto.

---

## 🏠 Tecnologias Utilizadas

### Backend

- **Node.js** → Plataforma para execução do código JavaScript no servidor.
- **Express.js** → Framework minimalista para construção de APIs.
- **TypeScript** → Tipagem estática para maior segurança e escalabilidade.
- **Prisma ORM** → Facilita a manipulação do banco de dados.
- **JWT (JSON Web Token)** → Autenticação segura.

### Banco de Dados

- **MySQL** → Armazena todas as informações do sistema.
- **Docker** → Contêiner para gerenciar a instância do banco de dados.

### Infraestrutura e Configuração

- **Docker e Docker Compose** → Facilita a configuração e execução do banco de dados.
- **dotenv** → Gerenciamento seguro de variáveis de ambiente.
- **Insomnia** → Testes das requisições da API.

---

## 🚀 Como Instalar e Executar

### ✅ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- **[Node.js](https://nodejs.org/)** (versão LTS mais recente).
- **[Docker](https://www.docker.com/)** e **Docker Compose**.
- **Gerenciador de pacotes npm ou yarn**.

### 📥 Passo a Passo

1️⃣ **Clonar o Repositório**

```bash
git clone https://github.com/RicardoTavaresDias/GERENCIADOR-DE-TAREFAS.git
cd GERENCIADOR-DE-TAREFAS
```

2️⃣ **Instalar Dependências**

```bash
npm install
```

3️⃣ **Configurar Variáveis de Ambiente**

- Copie o arquivo de exemplo:

```bash
cp .env-example .env
```

- Edite o arquivo **.env** com as credenciais do banco de dados.

4️⃣ **Subir o Banco de Dados com Docker**

```bash
docker-compose up -d
```

5️⃣ **Rodar Migrações do Prisma**

```bash
npx prisma migrate dev
```

6️⃣ **Executar o Servidor**

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

---

## 🔗 Testando a API com Insomnia

Para testar a API, utilize o **Insomnia**.

### 🛠 Como Usar

1. **Baixe e instale o [Insomnia](https://insomnia.rest/)**.
2. **Importe o arquivo de configuração**:
   - Vá até **Application > Preferences > Data > Import Data**.
   - Selecione o arquivo `Insomnia.json` disponível no repositório.
3. **Autentique-se na API**:
   - Faça login na rota `/auth/login`.
   - Copie o token JWT e utilize no cabeçalho (`Authorization: Bearer {token}`).

### 📝 Exemplos de Requisições

#### 1️⃣ Criar uma Tarefa
- **Endpoint:** `POST /tasks`
- **Corpo da Requisição:**
```json
{
  "title": "Finalizar relatório",
  "description": "Escrever e revisar o relatório trimestral",
  "status": "pendente",
  "dueDate": "2024-12-31"
}
```

#### 2️⃣ Listar Todas as Tarefas
- **Endpoint:** `GET /tasks`
- **Headers:**
```json
{
  "Authorization": "Bearer SEU_TOKEN"
}
```

#### 3️⃣ Atualizar uma Tarefa
- **Endpoint:** `PUT /tasks/{id}`
- **Corpo da Requisição:**
```json
{
  "title": "Atualizar apresentação",
  "status": "em andamento"
}
```

#### 4️⃣ Deletar uma Tarefa (somente Admins)
- **Endpoint:** `DELETE /tasks/{id}`
- **Headers:**
```json
{
  "Authorization": "Bearer SEU_TOKEN"
}
```

Agora você pode testar todas as rotas no Insomnia de forma detalhada! 🚀

---

## 📄 Endpoints da API

### 🔑 Autenticação

- **POST** `/auth/login` → Autentica o usuário e retorna um token.
- **POST** `/auth/register` → Registra um novo usuário.

### 📌 Tarefas

- **POST** `/tasks` → Cria uma nova tarefa.
- **GET** `/tasks` → Lista todas as tarefas (apenas para Admins).
- **GET** `/tasks/:id` → Retorna detalhes de uma tarefa específica.
- **PUT** `/tasks/:id` → Atualiza uma tarefa existente.
- **DELETE** `/tasks/:id` → Remove uma tarefa (somente Admins).

---

## 🛠 Problemas Comuns e Soluções

- **Erro de conexão com o banco de dados**
  - Certifique-se de que o Docker está rodando corretamente (`docker ps`).
  - Verifique se as credenciais no `.env` estão corretas.

- **Erro ao executar migrações**
  - Tente rodar `npx prisma generate` antes de `npx prisma migrate dev`.

---

## 🐝 Licença

Este projeto está licenciado sob a **MIT License** – veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

💻 **Desenvolvido por [Ricardo Tavares Dias](https://github.com/RicardoTavaresDias).** 🚀

