const DB_URL = "https://feedbackboard-6f084-default-rtdb.firebaseio.com"; 

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
      .then(() => {
        alert("Feedback submitted!");
        location.reload(); 
      });
  };

  const deleteFeedback = (id) => {
    fetch(`https://feedbackboard-6f084-default-rtdb.firebaseio.com${id}.json`, {
      method: 'DELETE'
    }).then(() => {
      setFeedbacks(prev => prev.filter(item => item.id !== id));
    });
  };

  return (
    <div className="container">
      <ThemeToggle theme={theme} setTheme={setTheme} />
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

function ThemeToggle({ theme, setTheme }) {
  return (
    <button onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}>
      Toggle Theme ({theme})
    </button>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
