import { useEffect, useState } from "react";
import { getEvents } from "../api";
import { Link } from "react-router-dom";
import flowerImage from "../assets/images/flower.jpg";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error loading events:", error);
        setError("Error loading events");
      }
    };

    fetchEvents();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-lg-4 mb-4">
            <Link to={`/events/${event.id}`} className="card-link">
              <div className="card">
                <img
                  src={event.image ? event.image : { flowerImage }}
                  className="card-img-top"
                  alt={event.title}
                />
                <div className="card-body">
                  <h4 className="card-title">{event.title}</h4>
                  <p className="card-text">{event.description}</p>
                  <h5 className="card-text">{event.date}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
