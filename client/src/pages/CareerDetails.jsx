import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CareerDetails() {
  const { id } = useParams();

  const [career, setCareer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openAnswer, setOpenAnswer] = useState(null);

  // Filters
  const [typeFilter, setTypeFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("All");

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        // Fetch selected Career only
        const careerResponse = await axios.get(
         `https://carrer-path-d93u.onrender.com/api/careers/${id}`
        );

        setCareer(careerResponse.data);

        // Fetch only questions for this Career
        const questionResponse = await axios.get(
          `https://carrer-path-d93u.onrender.com/api/questions?career=${id}&limit=100`
        );

        setQuestions(questionResponse.data.questions);

      } catch (error) {
        console.log("Career Details Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareerData();
  }, [id]);


  // Filter Questions
  const filteredQuestions = questions.filter((item) => {
    const typeMatch =
      typeFilter === "All" ||
      item.type === typeFilter;

    const difficultyMatch =
      difficultyFilter === "All" ||
      item.difficulty === difficultyFilter;

    const skillMatch =
      skillFilter === "All" ||
      item.skill?.name === skillFilter;

    return (
      typeMatch &&
      difficultyMatch &&
      skillMatch
    );
  });


  const toggleAnswer = (questionId) => {
    setOpenAnswer(
      openAnswer === questionId
        ? null
        : questionId
    );
  };


  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading...</h2>
      </div>
    );
  }


  if (!career) {
    return (
      <div className="page-container">
        <h2>Career not found</h2>
      </div>
    );
  }


  return (
    <div className="page-container">

      {/* Career Information */}
      <div className="page-header">

        <h1>{career.name}</h1>

        <p>{career.description}</p>

        <p>
          <strong>Category:</strong>{" "}
          {career.category}
        </p>

        <p>
          <strong>Difficulty:</strong>{" "}
          {career.difficulty}
        </p>

      </div>


      {/* Skills */}
      <div>

        <h2>Skills Required</h2>

        <div className="skills">

          {career.skills.map((skill, index) => (
            <span key={index}>
              {skill}
            </span>
          ))}

        </div>

      </div>


      {/* Interview Questions */}
      <div className="question-list">

        <h2>Interview Questions</h2>


        {/* Filters */}
        <div className="question-filters">

          {/* Type */}
          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
          >
            <option value="All">All Types</option>
            <option value="Technical">Technical</option>
            <option value="Coding">Coding</option>
            <option value="HR">HR</option>
          </select>


          {/* Difficulty */}
          <select
            value={difficultyFilter}
            onChange={(e) =>
              setDifficultyFilter(e.target.value)
            }
          >
            <option value="All">
              All Difficulty
            </option>

            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>

          </select>


          {/* Skill */}
          <select
            value={skillFilter}
            onChange={(e) =>
              setSkillFilter(e.target.value)
            }
          >

            <option value="All">
              All Skills
            </option>

            {career.skills.map((skill, index) => (
              <option
                key={index}
                value={skill}
              >
                {skill}
              </option>
            ))}

          </select>

        </div>


        {/* Questions */}
        {filteredQuestions.length === 0 ? (

          <p>
            No interview questions found.
          </p>

        ) : (

          filteredQuestions.map((item, index) => (

            <div
              className="question-card"
              key={item._id}
            >

              <div className="question-top">

                <span className="question-number">
                  Q{index + 1}
                </span>

                <span className="question-type">
                  {item.type}
                </span>

                <span className="question-difficulty">
                  {item.difficulty}
                </span>

              </div>


              <h2>
                {item.question}
              </h2>


              {item.skill && (
                <p className="question-skill">
                  <strong>Skill:</strong>{" "}
                  {item.skill.name}
                </p>
              )}


              {/* Show / Hide Answer */}
              <button
                onClick={() =>
                  toggleAnswer(item._id)
                }
              >
                {openAnswer === item._id
                  ? "Hide Answer"
                  : "Show Answer"}
              </button>


              {openAnswer === item._id && (

                <div className="answer">

                  <strong>Answer:</strong>

                  <p>
                    {item.answer}
                  </p>

                </div>

              )}

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default CareerDetails;