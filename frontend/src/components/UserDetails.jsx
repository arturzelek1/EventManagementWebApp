import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetailPage = () => {
  const { userId } = useParams(); // Zakładamy, że userId jest przekazywane w parametrach URL
  const [user, setUser] = useState(null);
  const [eventsJoined, setEventsJoined] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`/api/users/${userId}/`);
        setUser(userResponse.data);

        const eventsResponse = await axios.get(`/api/users/${userId}/events/`);
        setEventsJoined(eventsResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user details.");
      }
    };

    fetchUserData();
  }, [userId]);

  if (error) return <div className="alert alert-danger">{error}</div>;

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1>User Detail</h1>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <h2>Events Joined:</h2>
      <ul className="list-group">
        {eventsJoined.length > 0 ? (
          eventsJoined.map((registration) => (
            <li key={registration.event_ID} className="list-group-item">
              {registration.event_ID.title}
            </li>
          ))
        ) : (
          <li className="list-group-item">No events joined.</li>
        )}
      </ul>
    </div>
  );
};

export default UserDetailPage;
