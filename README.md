# 🔐 PssOp - Password Manager

A simple and secure password manager built using **React**, **TailwindCSS**, **Express.js**, and **MongoDB**.  
PssOp allows you to **save, edit, copy, and delete** your passwords with an intuitive UI and backend storage.

---

## 🚀 Features

- 📝 Add new passwords (site, username, password)
- ✏️ Edit existing passwords
- ❌ Delete saved passwords
- 📋 Copy username, site, or password to clipboard
- 👁️ Show/Hide password toggle
- 🎨 Styled with TailwindCSS
- 💾 Persistent storage with MongoDB
- ⚡ Toast notifications with `react-toastify`

---

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS, React-Toastify
- **Backend:** Express.js, Node.js
- **Database:** MongoDB
- **Other:** UUID for unique IDs, CORS enabled

---

## 📂 Project Structure

.
├── backend/ # Express server
│ ├── server.js
│ ├── package.json
│ └── .env
├── public/ # Public assets
│ ├── icons/
│ └── vite.svg
├── src/ # React frontend
│ ├── components/
│ │ ├── Footer.jsx
│ │ ├── manger.jsx
│ │ └── navbar.jsx
│ ├── App.jsx
│ ├── main.jsx
│ ├── App.css
│ └── index.css
├── package.json # Frontend dependencies
├── vite.config.js # Vite config
└── README.md

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/password-manager.git
cd password-manager
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
Create a .env file in backend/:

env
Copy code
MONGO_URI=mongodb://localhost:27017
DB_NAME=passop
PORT=3000
Start the backend:

bash
Copy code
node server.js
3️⃣ Frontend Setup
bash
Copy code
cd ..
npm install
npm run dev
📸 Screenshots

<img width="944" height="479" alt="Screenshot 2025-09-08 120801" src="https://github.com/user-attachments/assets/1ac96493-4c88-4aaa-ac74-36f9f37c63e7" />








🔮 Future Improvements
🔑 Password encryption before saving to DB

👤 User authentication

🌐 Deployment (Vercel + Render/Mongo Atlas)

📱 Mobile-friendly improvements

👨‍💻 Author
Created with ❤️ by FaizanMk
