import { Link } from "react-router-dom";

function InterviewPreparation() {
  return (
    <div className="page-container">

      <div className="page-header">
        <h1>Interview Preparation</h1>

        <p>
          Prepare for technical, coding and HR interviews
          based on your target career.
        </p>
      </div>


      <div className="feature-grid">

        <div className="feature-card">
          <h2>💻 Technical Questions</h2>

          <p>
            Practice career-specific technical interview
            questions.
          </p>

          <Link to="/careers">
            <button>
              Practice Questions
            </button>
          </Link>
        </div>


        <div className="feature-card">
          <h2>🧑‍💻 Coding Questions</h2>

          <p>
            Practice coding questions related to your
            selected career and skills.
          </p>

          <Link to="/careers">
            <button>
              Start Coding Practice
            </button>
          </Link>
        </div>


        <div className="feature-card">
          <h2>👩‍💼 HR Questions</h2>

          <p>
            Prepare common HR interview questions and
            fresher interview answers.
          </p>

          <Link to="/careers">
            <button>
              Practice HR Questions
            </button>
          </Link>
        </div>

      </div>


      <div className="career-section">

        <h2>How to Prepare?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>1️⃣ Choose Career</h3>
            <p>
              Select the career you are preparing for.
            </p>
          </div>

          <div className="feature-card">
            <h3>2️⃣ Practice Questions</h3>
            <p>
              Practice technical, coding and HR questions.
            </p>
          </div>

          <div className="feature-card">
            <h3>3️⃣ Review Answers</h3>
            <p>
              Check the answers and improve your understanding.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default InterviewPreparation;