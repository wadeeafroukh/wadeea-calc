# 💰 Wadeea Calculator

A full-stack financial tracker that helps you manage your income, expenses, transfers, and debts — with both guest mode and authenticated user mode.

---

## 🚀 Features

### 👤 Guest Mode
- Add / delete actions locally
- Add / delete debts locally
- Data stored temporarily in browser

### 🔐 Member Mode
- Register & Login (JWT Authentication)
- Save actions & debts in database
- Personal stats (weekly & monthly – upcoming)

### 💸 Actions System
- Income / Expense / Transfer / Debt Payment
- Cash & Bank tracking
- Smart balance calculation

### 🧾 Debts System
- Add debts
- Track remaining amount
- Auto-update when paying debts

---

## 🧠 Tech Stack

### Frontend
- React + TypeScript
- Bootstrap 5
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Joi Validation

---

## 📁 Project Structure

src/  ├── components/  ├── interface/  ├── service/  ├── App.tsx

---

## ⚙️ Installation

### 1. Clone the project
git clone YOUR_REPO_URL cd wadeea-calculator

### 2. Install dependencies
npm install

### 3. Run frontend
npm start

### 4. Run backend (separately)
cd server npm install npm run dev

---

## 🔐 Environment Variables

Create a .env file in the backend:

PORT=8000 DB=your_mongodb_connection JWTKEY=your_secret_key

⚠️ .env is not included in this repository.

---

## 🌐 API Endpoints

### Users
- POST /api/users → Register
- POST /api/users/login → Login

### Actions
- CRUD operations (auth required)

### Debts
- CRUD operations (auth required)

---

## 📌 Notes

- Guest mode works without backend
- Member mode requires running backend
- Validation handled with Joi
- Passwords are hashed using bcrypt

---

## 🔥 Future Improvements

- Stats page (charts & analytics)
- Edit actions / debts
- Better UI/UX design
- Dark mode

---

## 👨‍💻 Author

Wadeea Froukh

---

## ⭐ If you like this project

Give it a star ⭐ on Gi