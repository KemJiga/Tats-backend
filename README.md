# 🍦 Tats API

A Node.js/Express API for managing an ice cream business inventory, recipes, and stock using Notion as a database.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## ✨ Features

- **Bolis Management**: Create, read, and update ice cream inventory
- **Recetas Management**: Store and manage ice cream recipes with ingredients and steps
- **Materiales Management**: Track raw materials and ingredients
- **Stock Overview**: Get complete inventory status
- **Notion Integration**: Uses Notion as a database backend
- **TypeScript**: Full type safety and better development experience
- **RESTful API**: Clean and intuitive API design

## 🔧 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Notion account with API access
- Notion databases set up for:
  - Bolis (ice cream)
  - Recetas (recipes)
  - Materiales (materials)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KemJiga/Tats-backend.git
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔐 Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Notion API Configuration
NOTION_API_KEY=your_notion_api_key_here
BOLIS_DB_ID=your_bolis_database_id
RECETAS_DB_ID=your_recetas_database_id
MATERIALES_DB_ID=your_materiales_database_id

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Getting Notion API Key and Database IDs

1. **API Key**: Go to [Notion Integrations](https://www.notion.so/my-integrations) and create a new integration
2. **Database IDs**: Share your Notion databases with the integration and copy the database IDs from the URL

## 📚 API Endpoints

### 🍦 Bolis (Ice Cream)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/bolis` | Get all bolis |
| GET | `/bolis/:name` | Get boli by name |
| POST | `/bolis` | Create new boli |
| PUT | `/bolis` | Update boli stock |

### 📖 Recetas (Recipes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/recetas` | Get all recipes |
| GET | `/recetas/:name` | Get recipe by name |
| POST | `/recetas` | Create new recipe |
| PUT | `/recetas` | Update recipe |

### 📦 Materiales (Materials)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/materiales` | Get all materials |
| GET | `/materiales/:name` | Get material by name |
| POST | `/materiales` | Create new material |
| PUT | `/materiales` | Update material stock |

### 📊 Stock

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/stock` | Get complete stock (bolis + materiales) |

## 💡 Usage Examples

### Create a New Boli

```bash
curl -X POST http://localhost:3000/bolis \
  -H "Content-Type: application/json" \
  -d '{
    "sabor": "Fresa",
    "cantidad": 50,
    "gananciaPorUnidad": 2.5
  }'
```

### Create a New Recipe

```bash
curl -X POST http://localhost:3000/recetas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Helado de Vainilla",
    "ingredientes": ["leche", "crema", "vainilla", "azúcar"],
    "pasos": ["Mezclar la leche con la crema", "Agregar vainilla y azúcar", "Congelar por 4 horas"]
  }'
```

### Create a New Material

```bash
curl -X POST http://localhost:3000/materiales \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Leche",
    "cantidad": 10,
    "unidad": "litros",
    "presentacion": 1,
    "precio": 15.50
  }'
```

### Get Complete Stock

```bash
curl -X GET http://localhost:3000/stock
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── bolis.controller.ts
│   │   ├── recetas.controller.ts
│   │   ├── materiales.controller.ts
│   │   └── stock.controller.ts
│   ├── models/              # TypeScript interfaces
│   │   ├── bolis.model.ts
│   │   ├── recetas.model.ts
│   │   ├── materiales.model.ts
│   │   └── stock.model.ts
│   ├── routes/              # API routes
│   │   ├── bolis.routes.ts
│   │   ├── recetas.routes.ts
│   │   ├── materiales.routes.ts
│   │   ├── stock.routes.ts
│   │   └── index.ts
│   ├── services/            # Business logic
│   │   ├── bolis.service.ts
│   │   ├── recetas.service.ts
│   │   ├── materiales.service.ts
│   │   ├── stock.service.ts
│   │   └── notion.service.ts
│   ├── middleware/          # Express middleware
│   │   └── errorHandler.ts
│   ├── types/              # Type definitions
│   │   └── index.ts
│   └── index.ts            # Application entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠 Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **TypeScript**: Programming language
- **Notion API**: Database backend
- **dotenv**: Environment variable management

## 🧪 Testing

You can test the API using tools like:
- Postman
- cURL
- Thunder Client (VS Code extension)

## 📝 Data Models

### Boli (Ice Cream)
```typescript
interface Boli {
  id?: string;
  sabor: string;
  cantidad: number;
  gananciaPorUnidad: number;
}
```

### Receta (Recipe)
```typescript
interface Receta {
  id?: string;
  nombre: string;
  ingredientes: string[];
  pasos: string[];
}
```

### Material (Material)
```typescript
interface Material {
  id?: string;
  nombre: string;
  cantidad: number;
  unidad: string;
  presentacion: number;
  precio: number;
}
```

### Stock
```typescript
interface Stock {
  materiales: Material[];
  bolis: Boli[];
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue in the repository. 