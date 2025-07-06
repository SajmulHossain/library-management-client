# 📚 Minimal Library Management System

This is a minimal, clean, and fully functional library management system I developed using **React**, **TypeScript**, **Redux Toolkit Query**, and **Tailwind CSS** on the frontend, with a **Node.js**, **Express**, and **MongoDB** backend. The project showcases practical usage of CRUD operations, client-server communication, and proper UI/UX design—without user authentication or advanced business logic like payments or category filters.

---

## 👨‍💻 My Objective

The goal was to design a clean and functional library app where users can:
- Add and edit books
- Borrow books with quantity and due date
- Track borrowed books in a summarized view
- All while managing data through a RESTful API with proper state handling using RTK Query

---

## 🔧 Tech Stack I Used

| Layer        | Technology                    |
|--------------|-------------------------------|
| Frontend     | React + TypeScript            |
| State Management   | Redux Toolkit + RTK Query     |
| Styling      | Tailwind CSS                  |
| Backend      | Node.js + Express.js          |
| Database     | MongoDB + Mongoose            |

---

## ✨ Key Features I Implemented

### 📘 Book Management
- CRUD operations on books (Add, Edit, Delete)
- Book availability logic (copies = 0 ➝ unavailable)
- Proper form validation and real-time UI updates

### 📖 Borrow System
- Borrow form validates quantity against available copies
- Updates book availability dynamically
- Displays borrow summary with aggregated quantities

### 📊 Borrow Summary
- Aggregates total borrowed quantity per book
- Makes use of backend aggregation pipeline

### 🧭 Routing
- `/books` – Book list with all actions
- `/create-book` – Add new book
- `/edit-book/:id` – Edit existing book
- `/borrow/:bookId` – Borrow a book
- `/borrow-summary` – Summary of borrowed books

---

## 🧠 Why I Built It This Way

- **RTK Query**: To simplify API integration and caching.
- **TypeScript**: For better scalability and safety.
- **Modular Backend (MVC)**: Easier to maintain and test.
- **Tailwind CSS**: Fast styling with responsive design out of the box.
- **MongoDB Aggregation**: Clean and efficient way to compute borrow summaries.

---

## 🏆 Bonus Features I Added

- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Toast notifications for user actions
- ✅ Optimistic updates for better UX

---

## ⚙️ How to Run It

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📁 Project Structure

```
📁 src/
 ┣ 📁 redux/
 ┃ ┣ 📁 features/
 ┣ 📁 components/
 ┣ 📁 pages/
 ┗ 📄 main.tsx

📁 server/
 ┣ 📁 controllers/
 ┣ 📁 models/
 ┣ 📁 interfaces/
 ┗ 📄 server.ts
 ┗ 📄 app.ts
```

---

## 🚀 What I Learned

- Structuring large-scale frontend projects with Redux Toolkit Query
- Handling optimistic UI updates and caching
- Building expressive, clean REST APIs
- Aggregating data with MongoDB's `$group` pipeline
- Managing feature completeness while keeping the UI minimal

---

## 📝 License

This project is open-source and built for learning, showcasing, and portfolio purposes. Feel free to fork and extend it.

---