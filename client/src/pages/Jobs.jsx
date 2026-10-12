import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [experience, setExperience] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/jobs"
        );

        setJobs(
          Array.isArray(response.data)
            ? response.data
            : response.data.jobs || []
        );
      } catch (error) {
        console.log("Jobs API Error:", error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const searchMatch =
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.name?.toLowerCase().includes(searchText);

    const locationMatch =
      location === "All" || job.location === location;

    const experienceMatch =
      experience === "All" ||
      job.experienceLevel === experience;

    return searchMatch && locationMatch && experienceMatch;
  });

  return (
    <div className="page-container">

      <div className="page-header">
        <h1>Find Your Next Job 🚀</h1>

        <p>
          Explore fresher and entry-level opportunities
          based on your skills and career goals.
        </p>
      </div>

      <div className="job-filters">

        <input
          type="text"
          placeholder="Search job or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="All">All Locations</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
          <option value="Delhi NCR">Delhi NCR</option>
          <option value="Noida">Noida</option>
          <option value="Gurugram">Gurugram</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Remote">Remote</option>
        </select>

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="All">All Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="0-1 Years">0-1 Years</option>
          <option value="1-2 Years">1-2 Years</option>
        </select>

      </div>

      <p className="job-count">
        Showing <strong>{filteredJobs.length}</strong> jobs
      </p>

      <div className="job-list">

        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (

          filteredJobs.map((job) => (

            <div className="job-card" key={job._id}>

              <div className="job-header">
                <div>
                  <h2>{job.title}</h2>

                  <h3>
                    {job.company?.name || "Company"}
                  </h3>
                </div>
              </div>

              <div className="job-info">

                <p>
                  📍 <strong>Location:</strong>{" "}
                  {job.location}
                </p>

                <p>
                  💼 <strong>Experience:</strong>{" "}
                  {job.experienceLevel}
                </p>

                <p>
                  🎓 <strong>Degree:</strong>{" "}
                  {job.eligibleDegrees?.join(", ")}
                </p>

                {job.salary && (
                  <p>
                    💰 <strong>Salary:</strong>{" "}
                    {job.salary}
                  </p>
                )}

              </div>

              <div className="skills">

                {job.requiredSkills?.map(
                  (skill, index) => (
                    <span key={index}>
                      {skill}
                    </span>
                  )
                )}

              </div>

              <div className="job-buttons">

                <a
                  href={job.applicationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>Apply Now</button>
                </a>

                {job.company?.officialCareerUrl && (
                  <a
                    href={job.company.officialCareerUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="secondary-button">
                      Company Careers
                    </button>
                  </a>
                )}

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Jobs;