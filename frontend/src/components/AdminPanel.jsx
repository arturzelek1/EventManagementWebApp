import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  // Fetchowanie użytkowników
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin-dashboard/"); // Ścieżka do API użytkowników
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events/"); // Ścieżka do API wydarzeń
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Error fetching events");
      }
    };

    fetchUsers();
    fetchEvents();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <h1>Admin Dashboard</h1>
      <p>Here you can manage users and events.</p>
      <div className="row">
        {/* Sekcja użytkowników */}
        <div className="col-md-6">
          <h2>Users</h2>
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_ID}>
                  <td>{user.user_ID}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      to={`/edit_user/${user.user_ID}`}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/delete_user/${user.user_ID}`}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </Link>
                    <Link
                      to={`/user_detail/${user.user_ID}`}
                      className="btn btn-info btn-sm"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sekcja wydarzeń */}
        <div className="col-md-6">
          <h2>Events</h2>
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.event_ID}>
                  <td>{event.event_ID}</td>
                  <td>
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="event-thumbnail"
                      />
                    ) : (
                      <img
                        src={"/images/flower.jpg"}
                        alt="Default Image"
                        className="event-thumbnail"
                      />
                    )}
                  </td>
                  <td>{event.title}</td>
                  <td>{event.date}</td>
                  <td>
                    <Link
                      to={`/edit_event/${event.event_ID}`}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/delete_event/${event.event_ID}`}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/create_event" className="btn btn-success btn-sm mb-3">
            Create New Event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
