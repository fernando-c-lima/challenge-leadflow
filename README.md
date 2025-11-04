# LeadManager – Angular + .NET Core

CRUD de **Leads** com **Tasks** associadas.

---

## 🐳 Pré-requisitos

Para rodar o projeto inteiro (Backend, Frontend e Banco de Dados SQLite persistente) você só precisa ter instalado:

- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (inclui Docker Engine e Docker Compose)

> O projeto foi configurado com Docker Compose para encapsular todas as dependências do .NET, Node.js e banco de dados.

## 🧪 Tecnologias

- **Backend:** .NET 8/9, EF Core (SQLite, com migrações automáticas no startup), MediatR, AutoMapper, FluentValidation  
- **Frontend:** Angular 16+, Angular Material, SCSS  

---

## 💻 Rodando o projeto

Com o Docker Desktop rodando, abra o terminal na raiz do projeto (onde está o `docker-compose.yml`) e execute o seguinte comando:

```bash
docker-compose up --build
```
Este comando fará:

1. Build das imagens do Backend (API) e Frontend (Web).

2. Criação da Rede interna leadnet.

3. Criação de um Volume persistente para salvar os dados do SQLite (leads.db).

4. Execução automática das Migrações do EF Core na API, criando a tabela Leads se necessário.

## 🌐 Acessos
```bash
Serviço	       URL	          Porta Externa
Frontend      (Web)	          http://localhost:4200	Mapeado para a porta 80 do contêiner
Backend       (API)	          http://localhost:5088	Mapeado para a porta 8080 do contêiner
Swagger        UI	           http://localhost:5088/swagger/index.html	Para testar os Endpoints da API
```

- O frontend se comunica com a API via NGINX proxy através do endereço interno http://api:8080.

## 🛑 Parando o Projeto

Para parar e remover todos os contêineres e a rede:
```bash
docker-compose down
```

- Importante: Se você quiser parar e remover os volumes de dados (para começar com um banco de dados vazio), use: docker-compose down -v

### 🔌 Endpoints principais

**Leads**  
- `GET    api/leads`  
- `GET    api/leads/{id}`  
- `POST   api/leads`  
- `PUT    api/leads/{id}`  
- `DELETE api/leads/{id}`  

**Tasks**  
- `GET    api/leads/{leadId}/tasks`  
- `GET    api/leads/{leadId}/tasks/{taskId}`  
- `POST   api/leads/{leadId}/tasks`  
- `PUT    api/leads/{leadId}/tasks/{taskId}`  
- `DELETE api/leads/{leadId}/tasks/{taskId}`  
