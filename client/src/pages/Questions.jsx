import { useEffect, useState } from "react";
import axios from "axios";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState(
    []
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://carrer-path-d93u.onrender.com/api/questions?limit=100"
        );

        setQuestions(response.data.questions);

      } catch (error) {
        console.log(
          "Questions API Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const toggleComplete = async (questionId) => {
    let updatedQuestions;

    if (
      completedQuestions.includes(questionId)
    ) {
      updatedQuestions =
        completedQuestions.filter(
          (id) => id !== questionId
        );
    } else {
      updatedQuestions = [
        ...completedQuestions,
        questionId
      ];
    }

    setCompletedQuestions(updatedQuestions);

    // Calculate progress
    const progress = Math.round(
      (updatedQuestions.length /
        questions.length) *
        100
    );

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "https://carrer-path-d93u.onrender.com/api/auth/progress",
        {
          interview: progress
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    } catch (error) {
      console.log(
        "Progress Update Error:",
        error.response?.data?.message ||
        error.message
      );
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading questions...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">

        <h1>
          Interview Preparation
        </h1>

        <p>
          Practice technical, coding and HR
          interview questions.
        </p>

        <h3>
          Completed:{" "}
          {completedQuestions.length} /{" "}
          {questions.length}
        </h3>

      </div>

      {questions.length === 0 ? (
        <p>
          No questions found.
        </p>
      ) : (
        <div className="question-list">

          {questions.map(
            (item, index) => {

              const isCompleted =
                completedQuestions.includes(
                  item._id
                );

              return (
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
                    <p>
                      <strong>
                        Skill:
                      </strong>{" "}
                      {item.skill.name}
                    </p>
                  )}

                  <div className="answer">

                    <strong>
                      Answer:
                    </strong>

                    <p>
                      {item.answer}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      toggleComplete(
                        item._id
                      )
                    }
                  >
                    {isCompleted
                      ? "✅ Completed"
                      : "Mark as Complete"}
                  </button>

                </div>
              );
            }
          )}

        </div>
      )}

    </div>
  );
}

export default Questions;