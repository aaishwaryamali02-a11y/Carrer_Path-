import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CompanyDetails() {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
     
try {
  const companyResponse = await axios.get(
    `https://carrer-path-d93u.onrender.com/api/companies/${id}`
  );

  const jobsResponse = await axios.get(
    `https://carrer-path-d93u.onrender.com/api/jobs?company=${id}`
  );


        setCompany(companyResponse.data);
        setJobs(
          Array.isArray(jobsResponse.data)
            ? jobsResponse.data
            : jobsResponse.data.jobs || []
        );

      } catch (error) {
        console.log(
          "Company Details API Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading company details...</h2>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="page-container">
        <h2>Company not found.</h2>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="company-details">

        <div className="page-header">
          <h1>{company.name}</h1>
          <p>{company.description}</p>
        </div>

        <div className="company-section">

          <h2>🎓 Eligibility</h2>

          <div className="skills">
            {company.eligibleDegrees?.map(
              (degree, index) => (
                <span key={index}>
                  {degree}
                </span>
              )
            )}
          </div>

        </div>

        <div className="company-section">

          <h2>💼 Experience Level</h2>

          <p>{company.experienceLevel}</p>

        </div>

        <div className="company-section">

          <h2>👨‍💻 Roles</h2>

          <ul>
            {company.roles?.map(
              (role, index) => (
                <li key={index}>{role}</li>
              )
            )}
          </ul>

        </div>

        <div className="company-section">

          <h2>🛠️ Required Skills</h2>

          <div className="skills">
            {company.requiredSkills?.map(
              (skill, index) => (
                <span key={index}>
                  {skill}
                </span>
              )
            )}
          </div>

        </div>

        <div className="company-section">

          <h2>📝 Selection Process</h2>

          <ol>
            {company.selectionProcess?.map(
              (step, index) => (
                <li key={index}>{step}</li>
              )
            )}
          </ol>

        </div>

        <div className="company-section">

          <h2>📅 Hiring Information</h2>

          <p>
            Hiring months:
          </p>

          <div className="skills">
            {company.hiringMonths?.map(
              (month, index) => (
                <span key={index}>
                  {month}
                </span>
              )
            )}
          </div>

        </div>

        <div className="company-section">

          <h2>💼 Available Jobs</h2>

          {jobs.length === 0 ? (
            <p>No jobs available for this company.</p>
          ) : (

            jobs.map((job) => (

              <div
                className="company-job"
                key={job._id}
              >

                <h3>{job.title}</h3>

                <p>
                  📍 {job.location}
                </p>

                <p>
                  💰 {job.salary || "Not specified"}
                </p>

                <a
                  href={job.applicationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>Apply Now</button>
                </a>

              </div>

            ))

          )}

        </div>

        {company.officialCareerUrl && (
          <div className="company-section">

            <a
              href={company.officialCareerUrl}
              target="_blank"
              rel="noreferrer"
            >
              <button>
                Visit Official Careers
              </button>
            </a>

          </div>
        )}

      </div>

    </div>
  );
}

export default CompanyDetails;