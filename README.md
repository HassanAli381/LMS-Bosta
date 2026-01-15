# Bosta LMS

A robust Node.js/Express backend API for managing library operations, including book inventory, borrower management, and borrowing records.

## 📋 Features

- **Authentication**: Secure user authentication system
- **Book Management**: Create, update, and manage book inventory
- **Borrower Management**: Manage borrower profiles and information
- **Borrowing System**: Track book borrowing and return operations
- **Error Handling**: Global error handling middleware with custom error responses
- **Rate Limiting**: Request rate limiting for API protection
- **Input Validation**: Field validation utilities for data integrity

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (via Sequelize ORM)
- **Environment**: Node.js

## 📊 ERD

<img width="1294" height="548" alt="ERD" src="https://github.com/user-attachments/assets/32eddbc1-767c-475e-a8f7-a38488d9c1a1" />



# Project Structure
```
src/
├── config/                     # Configuration files
│   ├── config.js
│   └── db.js
├── core/
│   ├── app.js
│   └── server.js
├── modules/
│   ├── index.models.js
│   ├── routes.js
│   ├── auth/
│   │   ├── auth.controller.js
│   │   └── auth.routes.js
│   ├── book/
│   │   ├── book.controller.js
│   │   ├── book.model.js
│   │   ├── book.routes.js
│   │   └── book.service.js
│   ├── borrower/
│   │   ├── borrower.controller.js
│   │   ├── borrower.model.js
│   │   ├── borrower.routes.js
│   │   └── borrower.service.js
│   └── Borrowing/
│       ├── Borrowing.controller.js
│       ├── Borrowing.model.js
│       ├── Borrowing.routes.js
│       └── Borrowing.service.js
├── shared/
│   ├── middlewares/
│   │   ├── global-error-handler.middleware.js
│   │   ├── rate-limiter.js
│   │   └── unhandled-routes.middleware.js
│   └── utils/
│       ├── AppError.js
│       ├── checkAllowedFields.js
│       └── response-status.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm

### Installation

1. Clone the repository
    ```bash
    git clone <repository-url>
    cd Bosta LMS
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Configure environment variables
    - Create a `.env` file in the root directory
    - Add your configuration variables (see below for example)

4. Start the server
    ```bash
    npm run dev
    ```

### Example `.env` file
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/bosta_lms
JWT_SECRET=your_jwt_secret



## 📚 API Modules

### Authentication Module
- User login and registration
- Token-based authentication

### Book Module
- Create, read, update, delete books
- Manage book inventory

### Borrower Module
- Manage borrower profiles
- Track borrower history

### Borrowing Module
- Record book borrowings
- Track return dates
- Manage overdue items

## 🔒 Security Features

- **Global Error Handler**: Centralized error handling
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Validates allowed fields
- **Custom Error Classes**: Standardized error responses

## 📝 Project Scripts

```bash
npm run dev      # Start the server in development mode

Note: Ensure all environment variables are properly configured before deployment.
