import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareers = async () => {
      try {
       const response = await axios.get(
   "https://carrer-path-d93u.onrender.com/api/careers"
);

        setCareers(response.data);
      } catch (error) {
        console.log(error);
        setError("Unable to load career paths.");
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading career paths...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <h1>Explore Career Paths</h1>

        <p>
          Choose a career path and understand the skills,
          roadmap and preparation required.
        </p>
      </div>

      <div className="career-list">

        {careers.map((career) => (
          <div className="career-card" key={career._id}>

            <h2>{career.name}</h2>

            <p>{career.description}</p>

            <p>
              <strong>Category:</strong>{" "}
              {career.category}
            </p>

            <p>
              <strong>Difficulty:</strong>{" "}
              {career.difficulty}
            </p>

            <div className="skills">

              {career.skills.map((skill, index) => (
                <span key={index}>
                  {skill}
                </span>
              ))}

            </div>

           <Link to={`/careers/${career._id}`}>
  <button>View Roadmap</button>
</Link>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Careers;