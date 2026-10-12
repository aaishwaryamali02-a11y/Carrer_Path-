import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/companies"
        );

        setCompanies(
          Array.isArray(response.data)
            ? response.data
            : response.data.companies || []
        );
      } catch (error) {
        console.log("Company API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading companies...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <h1>Companies 🏢</h1>

        <p>
          Explore companies, eligibility, roles,
          required skills and selection processes.
        </p>
      </div>

      <div className="company-search">
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <p className="company-count">
        Showing <strong>{filteredCompanies.length}</strong>{" "}
        companies
      </p>

      <div className="company-list">

        {filteredCompanies.length === 0 ? (
          <p>No companies found.</p>
        ) : (

          filteredCompanies.map((company) => (

            <div
              className="company-card"
              key={company._id}
            >

              <h2>{company.name}</h2>

              <p>{company.description}</p>

              <p>
                <strong>Experience:</strong>{" "}
                {company.experienceLevel}
              </p>

              <div className="skills">
                {company.requiredSkills?.map(
                  (skill, index) => (
                    <span key={index}>
                      {skill}
                    </span>
                  )
                )}
              </div>

              <Link to={`/companies/${company._id}`}>
                <button>
                  View Company Details
                </button>
              </Link>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Companies;