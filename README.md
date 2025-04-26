
# Feedback Board

A simple and responsive Feedback Board app built using **React (CDN + Babel)** and **Firebase Realtime Database**.

It allows users to:
- Submit feedback (Name, Email, Comment)
- View feedback in real-time
- Delete feedback entries
- Toggle between Light and Dark themes
- Experience responsive layouts for mobile and desktop

<br/>

## ✨ Features
- **React Components** (`FeedbackForm`, `FeedbackList`, `FeedbackItem`, `ThemeToggle`)
- **Firebase Integration** (Realtime Database)
- **Form Validation** (Required fields, Email format)
- **Dynamic Feedback Display**
- **Feedback Deletion**
- **Theme Toggle** (with `localStorage` persistence)
- **Fully Responsive** (Flexbox + Grid Layouts, Media Queries)
- **External CSS Styling** (Gradients, Pseudo-classes, Transitions)

<br/>

## 🛠 Tech Stack
- **Frontend:** React (via CDN + Babel), HTML5, CSS3
- **Backend:** Firebase Realtime Database
- **Tools:** Fetch API (no third-party libraries)

<br/>

## 📂 Project Structure

```
/Feedback_Board
│
├── index.html      # Main HTML file with React and Babel via CDN
├── styles.css      # External CSS file (Flexbox, Grid, Media Queries, Animations)
└── scripts.js      # React components and Firebase logic
```

<br/>

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rajat2229/Feedback_Board.git
cd Feedback_Board
```

### 2. Setup Firebase
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable **Realtime Database** (Start in test mode)
- Copy your database URL (example: `https://your-project-id-default-rtdb.firebaseio.com/`)

### 3. Configure the Database URL
In `scripts.js`, update the database URL:

```javascript
const DB_URL = "https://your-project-id-default-rtdb.firebaseio.com/feedback.json";
```
and inside the delete function:

```javascript
fetch(`https://your-project-id-default-rtdb.firebaseio.com/feedback/${id}.json`, { method: 'DELETE' })
```

> 🔥 Important: Replace `your-project-id` with your actual Firebase project ID.

---



## ⚡ Live Demo
You can open the `index.html` directly in the browser after setup!

[Go Live](https://rajat2229.github.io/Feedback_Board/)

---

## 🧠 Things I Learned
- Handling state and props in pure React (without CRA setup)
- Realtime syncing with Firebase
- Theme management with localStorage
- Writing clean and responsive CSS with Flexbox and Grid

---

## 🙏 Acknowledgements
- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Babel Standalone](https://babeljs.io/docs/babel-standalone)

---

## 📬 Connect With Me
- GitHub: [@rajat2229](https://github.com/rajat2229)
- LinkedIn: [@Rajat Kumar](https://www.linkedin.com/in/rajat-kumar-b56711287/)

---

# ⭐ Happy Coding!

