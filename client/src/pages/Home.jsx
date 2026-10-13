import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await axios.get(
          "https://carrer-path-d93u.onrender.com/api/careers"
        );

        setCareers(
          Array.isArray(response.data)
            ? response.data
            : response.data.careers || []
        );
      } catch (error) {
        console.log("Career API Error:", error);
      }
    };

    fetchCareers();
  }, []);

  return (
    <div className="home">

      {/* Hero */}

      <section className="hero">
        <h1>From Degree to Job 🚀</h1>

        <p>
          Your degree is just the beginning.
          Build skills, follow roadmaps, create projects
          and prepare for real job opportunities.
        </p>

        <div className="hero-buttons">
          <Link to="/careers">
            <button>Explore Careers</button>
          </Link>

          <Link to="/jobs">
            <button>Find Jobs</button>
          </Link>
        </div>
      </section>


      {/* Features */}

      <section className="features">

        <h2>Everything You Need for Your Career</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>🗺️ Career Roadmaps</h3>
            <p>
              Follow a structured roadmap for your target career.
            </p>
          </div>

          <div className="feature-card">
            <h3>💻 Skills & Tools</h3>
            <p>
              Learn the technologies and tools required
              for your target role.
            </p>
          </div>

          <div className="feature-card">
            <h3>📚 Resources</h3>
            <p>
              Find useful documentation and learning resources.
            </p>
          </div>
  
         <Link
  to="/interview-preparation"
  className="feature-card"
>
  <h3>🎯 Interview Preparation</h3>

  <p>
    Practice technical, coding and HR interview questions.
  </p>
</Link>

        </div>

      </section>


      {/* Dynamic Career Paths */}

      <section className="career-section">

        <h2>Popular Career Paths</h2>

        <p className="career-intro">
          Choose a career path and discover the skills,
          roadmap, projects and jobs required for that role.
        </p>

        <div className="career-grid">

          {careers.length === 0 ? (
            <p>Loading career paths...</p>
          ) : (

            careers.slice(0, 3).map((career) => (

              <div
                className="career-card"
                key={career._id}
              >

                <h3>{career.name}</h3>

                <p>
                  {career.description}
                </p>

                <div className="skills">

                  {career.skills?.slice(0, 5).map(
                    (skill, index) => (
                      <span key={index}>
                        {skill}
                      </span>
                    )
                  )}

                </div>

                <Link
                  to={`/careers/${career._id}`}
                >
                  <button>
                    View Career Path
                  </button>
                </Link>

              </div>

            ))

          )}

        </div>

      </section>

    </div>
  );
}

export default Home;