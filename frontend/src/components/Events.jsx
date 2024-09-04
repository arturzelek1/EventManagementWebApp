import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Funkcja do pobierania wydarzeń
    const fetchEvents = async () => {
      try {
        const eventsResponse = await axios.get("/api/events/");
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Error fetching events");
      }
    };

    // Funkcja do pobierania informacji o użytkowniku
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get("/api/users/me/");
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      }
    };

    fetchEvents();
    fetchUser();
  }, []);

  // Funkcja do obsługi rejestracji i opuszczania wydarzenia
  const handleEventAction = async (eventId, action) => {
    try {
      if (action === "join") {
        await axios.post(`/api/events/${eventId}/join/`);
      } else if (action === "leave") {
        await axios.post(`/api/events/${eventId}/leave/`);
      }
      // Odświeżenie listy wydarzeń po akcji
      const eventsResponse = await axios.get("/api/events/");
      setEvents(eventsResponse.data);
      setMessages(["Event updated successfully"]);
    } catch (error) {
      console.error(`Error ${action} event:`, error);
      setError(`Error ${action} event`);
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!events.length) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1>Events</h1>
      <div className="list-group">
        {events.map((event) => (
          <div key={event.id} className="list-group-item">
            <h2>
              <Link to={`/events/${event.id}`}>{event.title}</Link>
            </h2>
            <p>Date: {event.date}</p>
            <p>Description: {event.description}</p>
            {user && (
              <>
                {user.registered_events.includes(event.id) ? (
                  <button
                    onClick={() => handleEventAction(event.id, "leave")}
                    className="btn btn-danger"
                  >
                    Leave Event
                  </button>
                ) : (
                  <button
                    onClick={() => handleEventAction(event.id, "join")}
                    className="btn btn-success"
                  >
                    Join Event
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        {messages.map((message, index) => (
          <div key={index} className="alert alert-info">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
