# Role-Based Access Control (RBAC) API

This is a Node.js application that demonstrates **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)** using Express and MongoDB. It allows users to register, log in, and access protected routes based on their roles.

---

## Features

- **User Authentication**  
  Users can securely register, log in, and log out using hashed passwords and JSON Web Tokens (JWT).

- **Role-Based Authorization**  
  Access control is implemented based on user roles (e.g., Admin, User, Moderator). Only users with specific roles can access certain endpoints.

- **Dynamic Role Management**  
  Roles are managed dynamically via a `Role` model, allowing flexibility to add or modify roles.

- **Security Best Practices**  
  Implements JWT for authentication and hashed passwords using bcrypt.

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud instance)
- Postman (optional, for API testing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/rbac-app.git
   cd rbac-app
