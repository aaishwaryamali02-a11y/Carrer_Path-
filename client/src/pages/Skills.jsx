import { useEffect, useState } from "react";
import axios from "axios";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(
         "https://carrer-path-d93u.onrender.com/api/skills"
        );

        setSkills(response.data);
      } catch (error) {
        console.log(error);
        setError("Unable to load skills.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading skills...</h2>
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
        <h1>Skills & Technologies</h1>

        <p>
          Learn the skills and tools required for your target
          career.
        </p>
      </div>

      <div className="skill-list">

        {skills.map((skill) => (
          <div className="skill-card" key={skill._id}>

            <div className="skill-card-header">
              <h2>{skill.name}</h2>

              <span className={`level ${skill.level.toLowerCase()}`}>
                {skill.level}
              </span>
            </div>

            <p className="skill-category">
              <strong>Category:</strong> {skill.category}
            </p>

            <p>
              {skill.description}
            </p>

            <div className="skill-tools">

              <strong>Tools:</strong>

              <div className="skills">
                {skill.tools.map((tool, index) => (
                  <span key={index}>
                    {tool}
                  </span>
                ))}
              </div>

            </div>

            <p>
              <strong>Importance:</strong>{" "}
              {skill.importance}
            </p>

            <button>
              View Resources
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Skills;