
## E-Commerce Application

This is a full-stack e-commerce website built using Next.js for the frontend and Node.js, Express.js, and PostgreSQL for the backend. The application supports user authentication, seller product management, and buyer shopping cart functionality. The UI supports both Larger and Smaller screens.

## Deployments handled on AWS Amplify(client) and Render(server).

Link - https://staging.d3cpbpn9wye9i1.amplifyapp.com/

## Features

User Sign Up and Login (for both sellers and buyers)

Sellers can add, update, and delete products.

Buyers can search products, add to cart, and remove from the cart.

Role-based functionality with separate seller and buyer dashboards.


## Technologies

Frontend: Next.js, Tailwind CSS

Backend: Node.js, Express.js

Database: PostgreSQL

## Getting Started

Prerequisites

Node.js installed

PostgreSQL installed


## Installation

## 1. Clone the repository:

git clone https://github.com/Shoaib2612/Ecommerce-NextJS.git

## 2. Install dependencies:

npm install

## 3. Configure environment variables:

Create a .env file in the root directory and add the following variables:

DATABASE_URL= postgresql://postgres.wyeamgddjtjoknsvgxiu:[your Password]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres

## 4. Set up the database:

# PostgreSQL commands to create the database tables

## Users Table :

CREATE TABLE users (
    id SERIAL PRIMARY KEY,                 -- Auto-incrementing ID for each user
    role VARCHAR(20) NOT NULL,             -- Role of the user (e.g., 'seller', 'buyer')
    username VARCHAR(50) NOT NULL,         -- Username for the user
    email VARCHAR(100) NOT NULL UNIQUE,    -- Email of the user (must be unique)
    password VARCHAR(255) NOT NULL,        -- Hashed password for the user
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp when the user is created
);

## Products Table :

CREATE TABLE products (
    id SERIAL PRIMARY KEY,                -- Auto-incrementing ID for each product
    seller_id INT REFERENCES users(id) ON DELETE CASCADE, -- Reference to the seller (user)
    name VARCHAR(100) NOT NULL,           -- Product name
    category VARCHAR(50) NOT NULL,        -- Product category (e.g., 'clothes', 'shoes')
    description TEXT,                     -- Product description
    price DECIMAL(10, 2) NOT NULL,        -- Product price with two decimal points
    discount DECIMAL(5, 2) DEFAULT 0,     -- Discount on the product (default is 0)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp when the product is created
);

## Cart Table : 

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,                -- Auto-incrementing ID for each cart item
    user_id INT REFERENCES users(id) ON DELETE CASCADE,  -- Reference to the buyer (user)
    product_id INT REFERENCES products(id) ON DELETE CASCADE,  -- Reference to the product
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when the product is added to the cart
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp when the cart is updated
);
## 5. Run the app:

## Backend (server)
npm start
The backend server should be running on http://localhost:5000.

## Frontend (client)
npm run dev

API Documentation

# Below is a list of the API endpoints available in this project:

---

## User Authentication

## 1. User Signup

Endpoint: POST /signup
Description: Allows users to sign up as a seller or buyer.

Request Body:
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Password123!",
  "role": "seller"
}

Responses:

201 Created: User registered successfully.

400 Bad Request: Validation errors.

---

## 2. User Login

Endpoint: POST /login
Description: Allows users to log in with their credentials.

Request Body:

{
  "email": "john@example.com",
  "password": "Password123!"
}

Responses:

200 OK: User logged in successfully.

401 Unauthorized: Invalid credentials.

---

### Seller APIs

## 3. Get Seller Products

Endpoint: GET /seller/getproducts/:userId
Description: Retrieves all products added by a specific seller.

Parameters:

userId: ID of the seller

Responses:

200 OK: Returns a list of products.

404 Not Found: No products found.

---

## 4. Get All Seller Products

Endpoint: GET /seller/getallproducts
Description: Retrieves all products from all sellers.

Responses:

200 OK: Returns a list of all products.

404 Not Found: No products found.

---

## 5. Get Product By ID

Endpoint: GET /seller/getproductbyid/:productId
Description: Retrieves a specific product by its ID.

Parameters:

productId: ID of the product

Responses:

200 OK: Returns the product details.

404 Not Found: Product not found.

---

## 6. Add Products

Endpoint: POST /seller/addProducts/:userId
Description: Allows a seller to add new products.

Request Body:

{
  "product_name": "Product A",
  "category": "Clothing",
  "description": "Product description",
  "price": 100,
  "discount": 10
}

Responses:

201 Created: Product added successfully.

400 Bad Request: Validation errors.

---

## 7. Update Product

Endpoint: PUT /seller/updateproduct/:productId/:userId
Description: Allows a seller to update their product.

Request Body:

{
  "product_name": "Updated Product",
  "category": "Clothing",
  "price": 120,
  "discount": 5
}

Responses:

200 OK: Product updated successfully.

400 Bad Request: Validation errors.

---

## 8. Delete Product

Endpoint: DELETE /seller/deleteproduct/:id
Description: Allows a seller to delete a product.

Parameters:

id: ID of the product to be deleted

Responses:

200 OK: Product deleted successfully.

404 Not Found: Product not found.

---

### Buyer APIs

## 9. Get My Cart

Endpoint: GET /buyer/getmycart/:userId
Description: Retrieves the products in a buyer's cart.

Parameters:

userId: ID of the buyer


Responses:

200 OK: Returns the products in the cart.

404 Not Found: Cart is empty or user does not exist.

---

## 10. Add to Cart

Endpoint: POST /buyer/addtocart
Description: Adds a product to the buyer's cart.

Request Body:

{
  "productId": "123",
  "userId": "456",
}

Responses:

201 Created: Product added to cart successfully.

400 Bad Request: Validation errors.

---

## 11. Remove from Cart

Endpoint: DELETE /buyer/removecart/:id
Description: Removes a product from the buyer's cart.

Parameters:

id: ID of the product in the cart


Responses:

200 OK: Product removed from cart successfully.

404 Not Found: Product not found in cart.

---