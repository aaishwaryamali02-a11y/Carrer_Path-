import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://carrer-path-d93u.onrender.com/api/projects"
        );

        setProjects(response.data);
      } catch (error) {
        console.log("Project API Error:", error);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading projects...</h2>
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
        <h1>Projects</h1>
        <p>
          Build real-world projects to strengthen your skills
          and improve your job readiness.
        </p>
      </div>

      <div className="project-list">

        {projects.map((project) => (
          <div className="project-card" key={project._id}>

            <h2>{project.title}</h2>

            <p>{project.description}</p>

            <p>
              <strong>Difficulty:</strong>{" "}
              {project.difficulty}
            </p>

            <div className="skills">
              {project.technologies.map((tech, index) => (
                <span key={index}>{tech}</span>
              ))}
            </div>

            <h3>Features</h3>

            <ul>
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <div className="project-buttons">

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Projects;