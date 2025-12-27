import { useEffect, useState } from "react";
import "../lostfound.css";

export default function LostAndFound() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    type: "lost",
    title: "",
    location: "",
    description: "",
    image: ""
  });

  const styles = {
    img: {
      width: "100%",
      maxWidth: "260px",
      aspectRatio: 4 / 3,
      objectFit: "cover",
      borderRadius: "12px"
    },
    type: {
      color: "red"
    }
  };

 
  useEffect(() => {
    fetch("http://localhost:5000/api/lost-found")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(console.error);
  }, []);

 
  const postItem = async () => {
    if (!form.title || !form.location) return;

    setItems(prev => [{ ...form, id: Date.now() }, ...prev]);

    setForm({
      type: "lost",
      title: "",
      location: "",
      description: "",
      image: ""
    });
  };

  return (
    <div className="lf-page">
      <h1>Lost & Found</h1>

      <div className="lf-form">
        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <input
          placeholder="Item name"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            const imageURL = URL.createObjectURL(file);
            setForm(prev => ({ ...prev, image: imageURL }));
          }}
        />

        <button onClick={postItem}>Post</button>
      </div>

      <div className="lf-list">
        {items.map((item) => (
          <div key={item._id} className="lf-card">
            {item.image && (
              <img src={item.image} style={styles.img} />
            )}
            <h3 style={styles.type}>
              {item.type.toUpperCase()}: {item.title}
            </h3>
            <p className="loc">
              Location: {item.location}
            </p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
