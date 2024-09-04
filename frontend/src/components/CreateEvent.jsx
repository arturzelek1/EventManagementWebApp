import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    status: "",
    organizer_ID: "",
    image: null,
    parent_event_ID: "",
  });

  const [error, setError] = useState(null);

  // Funkcja obsługująca zmianę wartości w polach formularza
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Funkcja obsługująca zmianę pliku w polu typu file
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Funkcja obsługująca przesyłanie formularza
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formToSubmit = new FormData();
    for (const key in formData) {
      formToSubmit.append(key, formData[key]);
    }

    try {
      await axios.post("/api/events/", formToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin_dashboard"); // Przekierowanie po udanym utworzeniu
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Error creating event");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Create Event</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            className="form-control"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            className="form-control"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="organizer_ID">Organizer:</label>
          <input
            type="text"
            className="form-control"
            id="organizer_ID"
            name="organizer_ID"
            value={formData.organizer_ID}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="parent_event_ID">Parent Event:</label>
          <input
            type="text"
            className="form-control"
            id="parent_event_ID"
            name="parent_event_ID"
            value={formData.parent_event_ID}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/admin_dashboard")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
