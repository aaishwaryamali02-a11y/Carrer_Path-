import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://carrer-path-d93u.onrender.com/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(response.data.user);

      } catch (error) {
        console.log("Profile Error:", error);

        setError(
          error.response?.data?.message ||
          "Failed to load profile"
        );
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="page-container">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-container">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <h1>My Profile</h1>

        <p>
          Welcome to your CareerPath profile.
        </p>
      </div>

      <div className="feature-card">

        <h2>👤 {user.name}</h2>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <p>
          <strong>Account Created:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>

      </div>

    </div>
  );
}

export default Profile;