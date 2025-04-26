const DB_URL = "https://feed-backboard-default-rtdb.firebaseio.com/feedback.json";

function App() {
  const [feedbacks, setFeedbacks] = React.useState([]);
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');

  React.useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  React.useEffect(() => {
    fetch(DB_URL)
      .then(res => res.json())
      .then(data => {
        if (data) {
          const entries = Object.entries(data).map(([id, val]) => ({ id, ...val }));
          setFeedbacks(entries);
        }
      });
  }, []);

  const addFeedback = (newFeedback) => {
    fetch(DB_URL, {
      method: 'POST',
      body: JSON.stringify(newFeedback),
    })
      .then(res => res.json())
      .then((data) => {
        const newEntry = { id: data.name, ...newFeedback };
        setFeedbacks(prev => [...prev, newEntry]);
        alert("Feedback submitted!");
      });
  };

  const deleteFeedback = (id) => {
    fetch(`https://feed-backboard-default-rtdb.firebaseio.com/feedback/${id}.json`, {
      method: 'DELETE'
    }).then(() => {
      setFeedbacks(prev => prev.filter(item => item.id !== id));
    });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="container">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <FeedbackForm onSubmit={addFeedback} />
      <FeedbackList feedbacks={feedbacks} onDelete={deleteFeedback} />
    </div>
  );
}

function FeedbackForm({ onSubmit }) {
  const [formData, setFormData] = React.useState({ name: "", email: "", comment: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, comment } = formData;
    if (!name || !email || !comment) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return alert("Please fill all fields with a valid email.");
    onSubmit({ ...formData, timestamp: new Date().toISOString() });
    setFormData({ name: "", email: "", comment: "" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <textarea name="comment" placeholder="Comment" value={formData.comment} onChange={handleChange}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

function FeedbackList({ feedbacks, onDelete }) {
  return (
    <div className="list">
      {feedbacks.map(fb => (
        <FeedbackItem key={fb.id} data={fb} onDelete={onDelete} />
      ))}
    </div>
  );
}

function FeedbackItem({ data, onDelete }) {
  return (
    <div className="card">
      <h3>{data.name}</h3>
      <p>{data.comment}</p>
      <small>{data.email}</small>
      <button onClick={() => onDelete(data.id)}>Delete</button>
    </div>
  );
}

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <img 
        src={theme === 'light' 
          ? 'https://cdn-icons-png.flaticon.com/512/869/869869.png'  
          : 'https://cdn-icons-png.flaticon.com/512/869/869869.png'}  
        alt="Toggle Theme"
      />
    </button>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
