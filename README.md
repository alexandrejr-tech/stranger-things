# Stranger Things Experience

Uma aplicação full-stack inspirada na experiência imersiva de Stranger Things, onde usuários podem explorar cidades, reservar ingressos e gerenciar suas reservas. Desenvolvido com React, Node.js e Supabase.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=white)

---

## Sobre o Projeto

O **Stranger Things Experience** simula uma plataforma de venda de ingressos para experiências imersivas em diferentes cidades ao redor do mundo. O projeto começou como uma landing page estática e foi transformado em uma aplicação full-stack completa.

### Funcionalidades
- Landing page com animações cinematográficas (GSAP + ScrollSmoother)
- Sistema de autenticação (registro e login com JWT)
- Catálogo de cidades com experiências disponíveis
- Reserva de ingressos com seleção de data e horário
- Validação de datas e horários passados
- Painel "Minhas Reservas" para acompanhar reservas
- Layout responsivo (desktop e mobile)
- Carrossel de cidades no mobile

---

## Tech Stack

### Frontend
- **React 19** com Vite
- **React Router v7** para navegação SPA
- **GSAP** (ScrollTrigger, ScrollSmoother, SplitText) para animações
- **Axios** para chamadas HTTP
- **CSS** puro com media queries responsivas

### Backend
- **Node.js** com Express
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **Supabase** (PostgreSQL) como banco de dados

### Infraestrutura
- **Vercel** (frontend + backend)
- **Supabase** (banco de dados e autenticação)

---

## Estrutura do Projeto

```
stranger-things/
├── frontend/                # React (Vite)
│   ├── public/
│   │   └── imagens/         # Assets estáticos
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── CitySection.jsx
│   │   │   ├── TestimonialSection.jsx
│   │   │   ├── ThankYouSection.jsx
│   │   │   ├── BookingModal.jsx
│   │   │   ├── Preloader.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/           # Páginas da aplicação
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── CityDetails.jsx
│   │   │   └── MyBookings.jsx
│   │   ├── context/         # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── services/        # Configuração de API
│   │   │   └── api.js
│   │   └── styles/
│   │       └── style.css
│   └── package.json
│
├── backend/                 # Node.js + Express
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js      # Registro e login
│   │   │   ├── cities.js    # CRUD de cidades
│   │   │   ├── bookings.js  # Reservas de ingressos
│   │   │   └── testimonials.js
│   │   ├── middleware/
│   │   │   └── auth.js      # Middleware JWT
│   │   ├── config/
│   │   │   └── supabase.js  # Conexão com banco
│   │   └── server.js
│   └── package.json
│
└── README.md
```

---

## API Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `POST` | `/api/auth/register` | Criar conta | Não |
| `POST` | `/api/auth/login` | Fazer login | Não |
| `GET` | `/api/cities` | Listar cidades | Não |
| `GET` | `/api/cities/:id` | Detalhes da cidade | Não |
| `GET` | `/api/testimonials` | Listar depoimentos | Não |
| `POST` | `/api/bookings` | Criar reserva | Sim |
| `GET` | `/api/bookings` | Minhas reservas | Sim |

---

## Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- Conta no [Supabase](https://supabase.com)

### 1. Clone o repositório
```bash
git clone https://github.com/alexandrejr-tech/stranger-things.git
cd stranger-things
```

### 2. Configure o backend
```bash
cd backend
npm install
```

Crie o arquivo `.env` na pasta `backend/`:
```env
PORT=3001
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_publica
SUPABASE_SERVICE_KEY=sua_chave_service
JWT_SECRET=sua_chave_secreta_jwt
```

### 3. Configure o frontend
```bash
cd ../frontend
npm install
```

Crie o arquivo `.env` na pasta `frontend/` (opcional, para apontar ao backend em produção):
```env
VITE_API_URL=http://localhost:3001
```

### 4. Inicie os servidores
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Acesse **http://localhost:5173**

---

## Banco de Dados

O projeto utiliza 4 tabelas no Supabase:

- **cities** — Cidades com experiências disponíveis
- **events** — Eventos vinculados a cada cidade (título, preço, capacidade)
- **bookings** — Reservas dos usuários (data, horário, quantidade, status)
- **testimonials** — Depoimentos de visitantes

---

## Screenshots

### Landing Page
> Hero com animações GSAP e scroll suave

### Reserva de Ingressos
> Seleção de data, horário e quantidade com validação em tempo real

### Minhas Reservas
> Painel do usuário com histórico de reservas

---

## Aprendizados

- Migração de projeto estático para aplicação full-stack
- Integração React com animações GSAP (ScrollSmoother, SplitText)
- Autenticação JWT com middleware no Express
- Modelagem de banco de dados relacional (PostgreSQL via Supabase)
- Deploy de monorepo com frontend e backend separados na Vercel
- Responsividade e UX mobile (carrossel CSS, layout adaptativo)

---

## Autor

Desenvolvido por **Alexandre Junior**

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alexandre-carvalhojr/)
