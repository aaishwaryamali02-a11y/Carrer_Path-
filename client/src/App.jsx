import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import { useState } from "react";

import Home from "./pages/Home";
import Careers from "./pages/Careers";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import CareerDetails from "./pages/CareerDetails";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Questions from "./pages/Questions";
import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import Resources from "./pages/Resources";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">

        <Link to="/" className="logo">
          CareerPath
        </Link>

        <div className="nav-links">

          <Link to="/">Home</Link>

          <Link to="/careers">
            Careers
          </Link>

          <Link to="/skills">
            Skills
          </Link>

          <Link to="/jobs">
            Jobs
          </Link>

          <Link to="/projects">
            Projects
          </Link>

          <Link to="/questions">
            Interview Prep
          </Link>

          <Link to="/companies">
            Companies
          </Link>

          <Link to="/resources">
            Resources
          </Link>

          {isLoggedIn && (
  <Link to="/dashboard">
    Dashboard
  </Link>
)}
          
        {isLoggedIn && (
  <Link to="/profile">Profile</Link>
)}

          {isLoggedIn ? (
            <button onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/signup">
                Signup
              </Link>
            </>
          )}

        </div>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/careers"
          element={<Careers />}
        />

        <Route
          path="/careers/:id"
          element={<CareerDetails />}
        />

        <Route
          path="/skills"
          element={<Skills />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

 <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/questions"
          element={<Questions />}
        />

        <Route
          path="/companies"
          element={<Companies />}
        />

        <Route
          path="/companies/:id"
          element={<CompanyDetails />}
        />

        <Route
          path="/resources"
          element={<Resources />}
        />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

      </Routes>

    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;