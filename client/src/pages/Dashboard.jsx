import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [progress, setProgress] = useState({
    skills: 0,
    interview: 0,
    resources: 0,
    projects: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

      
 // Fetch careers
 const careerResponse = await axios.get(
   "https://carrer-path-d93u.onrender.com/api/careers"
 );

 setCareers(careerResponse.data);

 // Fetch user profile
 const profileResponse = await axios.get(
   "https://carrer-path-d93u.onrender.com/api/auth/profile",
   {
     headers: {
       Authorization: `Bearer ${token}`
     }
   }
 );


        const userData = profileResponse.data.user;

        // Load selected career
        if (userData.selectedCareer) {
          setSelectedCareer(
            userData.selectedCareer
          );
        }

        // Load progress
        if (userData.progress) {
          setProgress(userData.progress);
        }

      } catch (error) {
        console.log(
          "Dashboard Error:",
          error.response?.data?.message ||
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCareerChange = async (e) => {
    const careerId = e.target.value;

    const career = careers.find(
      (item) => item._id === careerId
    );

    setSelectedCareer(career || null);

    if (!careerId) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
       "https://carrer-path-d93u.onrender.com/api/auth/select-career",
        {
          careerId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSelectedCareer(
        response.data.user.selectedCareer
      );

      const updatedUser = {
        ...user,
        selectedCareer:
          response.data.user.selectedCareer
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

    } catch (error) {
      console.log(
        "Save Career Error:",
        error.response?.data?.message ||
        error.message
      );
    }
  };

  const updateProgress = async (
    field,
    value
  ) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://carrer-path-d93u.onrender.com/api/auth/progress",
        {
          [field]: value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProgress(response.data.progress);

    } catch (error) {
      console.log(
        "Progress Error:",
        error.response?.data?.message ||
        error.message
      );
    }
  };

  const overallProgress = Math.round(
    (
      progress.skills +
      progress.interview +
      progress.resources +
      progress.projects
    ) / 4
  );

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <h1>
          Welcome, {user?.name} 👋
        </h1>

        <p>
          Manage your CareerPath learning journey
          from one place.
        </p>
      </div>

      {/* Career Selection */}

      <div className="feature-card">

        <h2>🎯 Choose Your Career</h2>

        <p>
          Select the career you want to prepare for.
        </p>

        <select
          value={selectedCareer?._id || ""}
          onChange={handleCareerChange}
        >
          <option value="">
            -- Select Career --
          </option>

          {careers.map((career) => (
            <option
              key={career._id}
              value={career._id}
            >
              {career.name}
            </option>
          ))}
        </select>

      </div>

      {/* Selected Career */}

      {selectedCareer && (
        <div className="feature-card">

          <h2>
            🎯 {selectedCareer.name}
          </h2>

          <p>
            {selectedCareer.description}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {selectedCareer.category}
          </p>

          <p>
            <strong>Difficulty:</strong>{" "}
            {selectedCareer.difficulty}
          </p>

          <h3>Required Skills</h3>

          <div className="skills">

            {selectedCareer.skills?.map(
              (skill, index) => (
                <span key={index}>
                  {skill}
                </span>
              )
            )}

          </div>

          <br />

          <Link
            to={`/careers/${selectedCareer._id}`}
          >
            <button>
              View Career Details
            </button>
          </Link>

        </div>
      )}

      {/* Progress */}

      <div className="feature-card">

        <h2>📊 Your Career Progress</h2>

        <h3>
          Overall Progress: {overallProgress}%
        </h3>

        {/* Skills */}

        <p>
          💻 Skills: {progress.skills}%
        </p>

        <progress
          value={progress.skills}
          max="100"
        />

        <br />
        <br />

        {/* Interview */}

        <p>
          📝 Interview: {progress.interview}%
        </p>

        <progress
          value={progress.interview}
          max="100"
        />

        <br />
        <br />

        {/* Resources */}

        <p>
          📚 Resources: {progress.resources}%
        </p>

        <progress
          value={progress.resources}
          max="100"
        />

        <br />
        <br />

        {/* Projects */}

        <p>
          🚀 Projects: {progress.projects}%
        </p>

        <progress
          value={progress.projects}
          max="100"
        />

      </div>

      {/* Progress Controls */}

      <div className="feature-card">

        <h2>⚙️ Update Progress</h2>

        <p>
          Update your learning progress.
        </p>

        <button
          onClick={() =>
            updateProgress("skills", 25)
          }
        >
          Skills 25%
        </button>

        {" "}

        <button
          onClick={() =>
            updateProgress("skills", 50)
          }
        >
          Skills 50%
        </button>

        {" "}

        <button
          onClick={() =>
            updateProgress("skills", 100)
          }
        >
          Skills 100%
        </button>

        <br />
        <br />

        <button
          onClick={() =>
            updateProgress("interview", 25)
          }
        >
          Interview 25%
        </button>

        {" "}

        <button
          onClick={() =>
            updateProgress("interview", 50)
          }
        >
          Interview 50%
        </button>

        {" "}

        <button
          onClick={() =>
            updateProgress("interview", 100)
          }
        >
          Interview 100%
        </button>

      </div>

      {/* Dashboard Features */}

      <div className="feature-grid">

        <div className="feature-card">
          <h2>👤 My Profile</h2>

          <p>
            View your account information.
          </p>

          <Link to="/profile">
            <button>
              View Profile
            </button>
          </Link>
        </div>

        <div className="feature-card">
          <h2>💻 Skills</h2>

          <p>
            Learn important technical skills
            and tools.
          </p>

          <Link to="/skills">
            <button>
              Explore Skills
            </button>
          </Link>
        </div>

        <div className="feature-card">
          <h2>📝 Interview Preparation</h2>

          <p>
            Practice technical, coding and HR
            questions.
          </p>

          <Link to="/questions">
            <button>
              Practice Questions
            </button>
          </Link>
        </div>

        <div className="feature-card">
          <h2>📚 Resources</h2>

          <p>
            Access documentation, videos and notes.
          </p>

          <Link to="/resources">
            <button>
              View Resources
            </button>
          </Link>
        </div>

        <div className="feature-card">
          <h2>💼 Jobs</h2>

          <p>
            Explore job opportunities.
          </p>

          <Link to="/jobs">
            <button>
              Explore Jobs
            </button>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;