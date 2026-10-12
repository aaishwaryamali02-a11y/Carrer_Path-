import { useEffect, useState } from "react";
import axios from "axios";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/resources"
        );

        setResources(response.data);
      } catch (error) {
        console.log("Resource API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Group resources by skill
  const groupedResources = resources.reduce((groups, resource) => {
    const skillName = resource.skill?.name || "Other";

    if (!groups[skillName]) {
      groups[skillName] = [];
    }

    groups[skillName].push(resource);

    return groups;
  }, {});

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading resources...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <h1>Learning Resources</h1>

        <p>
          Find documentation, YouTube videos and notes
          to improve your skills.
        </p>
      </div>

      {Object.keys(groupedResources).length === 0 ? (
        <p>No resources found.</p>
      ) : (
        <div className="feature-grid">

          {Object.entries(groupedResources).map(
            ([skillName, skillResources]) => (

              <div
                className="feature-card"
                key={skillName}
              >

                <h2>📚 {skillName}</h2>

                {skillResources.map((resource) => (

                  <div
                    key={resource._id}
                    className="resource-item"
                  >

                    <h3>{resource.title}</h3>

                    <p>
                      {resource.description}
                    </p>

                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.type === "Documentation" &&
                        "📄 Open Documentation"}

                      {resource.type === "YouTube" &&
                        "🎥 Watch YouTube Video"}

                      {resource.type === "Notes" &&
                        "📝 Open Notes"}
                    </a>

                  </div>

                ))}

              </div>

            )
          )}

        </div>
      )}

    </div>
  );
}

export default Resources;