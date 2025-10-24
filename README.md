# LeadManager – Angular + .NET Core

CRUD de **Leads** com **Tasks** associadas.

---

## 🧪 Tecnologias

- **Backend:** .NET 8/9, EF Core (SQLite), MediatR, AutoMapper, FluentValidation  
- **Frontend:** Angular 16+, Angular Material, SCSS  

---

> Componentes e módulos foram criados via Angular CLI; lógica customizada está nos serviços e componentes.

---

## 💻 Rodando o projeto

### Backend

```bash
cd backend
dotnet restore
dotnet build
dotnet ef database update --startup-project src/Api --project src/Infra
dotnet run --project src/Api
```

- http://localhost:5088/swagger/index.html

### Frontend
```bash
cd frontend
npm install
ng serve
```

- App: http://localhost:4200
- Ajuste a URL da API em src/app/core/services/api.ts se necessário.
- Certifique-se de que o backend está rodando em http://localhost:5088/api.


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
