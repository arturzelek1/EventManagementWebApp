import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import { useNavigate } from "react-router-dom";

const EventDetail = () => {
  const { eventId } = useParams(); // Pobieramy ID wydarzenia z URL
  //const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Funkcja do pobierania danych wydarzenia z API
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/events/${eventId}/`
        );
        setEvent(response.data);
        // Zakładamy, że odpowiedź zawiera informację, czy użytkownik jest zarejestrowany
        setIsRegistered(response.data.is_registered);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setError("Error fetching event data");
      }
    };

    fetchEvent();
  }, [eventId]);

  // Funkcja do obsługi dołączania do wydarzenia
  const handleJoin = async () => {
    try {
      await axios.post(`/api/events/${eventId}/join/`);
      setIsRegistered(true);
      setSuccessMessage("Successfully joined the event!");
    } catch (error) {
      console.error("Error joining event:", error);
      setError("Error joining the event");
    }
  };

  // Funkcja do obsługi opuszczania wydarzenia
  const handleLeave = async () => {
    try {
      await axios.post(`/api/events/${eventId}/leave/`);
      setIsRegistered(false);
      setSuccessMessage("Successfully left the event!");
    } catch (error) {
      console.error("Error leaving event:", error);
      setError("Error leaving the event");
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!event) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="event-card card">
        <img
          src={event.image ? event.image : "/images/flower.jpg"}
          className="card-img-top"
          alt={event.title}
        />
        <div className="card-body">
          <h1>{event.title}</h1>
          <p>Date: {event.date}</p>
          <p>Start Time: {new Date(event.start_date).toLocaleTimeString()}</p>
          <p>End Time: {new Date(event.end_date).toLocaleTimeString()}</p>
          <p>Description: {event.description}</p>
          <p>Location: {event.location}</p>
          <p>Status: {event.status}</p>
          <p>Organizer: {event.organizer_ID}</p>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {isRegistered ? (
            <button onClick={handleLeave} className="btn btn-danger">
              Leave Event
            </button>
          ) : (
            <button onClick={handleJoin} className="btn btn-success">
              Join Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
