import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../api";
import { useDispatch } from 'react-redux';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState(''); // New state for first name
  const [last_name, setlast_name] = useState('');   // New state for last name
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Password strength check function
  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const login = () => {
    api
      .post("http://localhost:8000/api/token/", { username, password })
      .then((resp) => {
        if (resp.status === 200) {
          localStorage.setItem("access_token", resp.data.access);
          dispatch(userinfoActions.login());
        } else {
          setError("Login failed. Please try again.");
        }
      })
      .catch((error) => {
        setError(error.response?.data?.detail || "Your Username or Password is incorrect! Please try again.");
      });
      navigate("/signup/Profile/");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setIsLoading(false);
      setError('Passwords do not match!');
      return;
    }

    if (!isStrongPassword(password)) {
      setIsLoading(false);
      setError('Password must be at least 8 characters long, include an uppercase letter, and a number.');
      return;
    }

    if (!isValidEmail(email)) {
      setIsLoading(false);
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length <= 5) {
      setIsLoading(false);
      setError('Password must be longer than 5 characters.');
      return;
    }

    // Send first_name, last_name along with other data
    api
      .post('http://localhost:8000/api/signup/', { username, password, email, first_name, last_name })
      .then((resp) => {
        if (resp.status === 201) {
          setIsLoading(false);
          login();
        } else {
          setIsLoading(false);
          setError('Something went wrong. Please try again.');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError("There was an issue with your signup. Please try again.");
      });
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100">
      <div className={`w-full max-w-sm p-6 bg-white rounded-lg shadow-lg ${isLoading ? 'pointer-events-none' : ''}`}>
      
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {isLoading ? (
          <div className="absolute p-11 flex justify-center items-center mt-5 mb-5">
            <div className="bg-black rounded-full animate-ping h-10 w-10 m-2"></div>
            <div className="bg-black rounded-full animate-ping h-10 w-10 m-2"></div>
            <div className="bg-black rounded-full animate-ping h-10 w-10 m-2"></div>
          </div>
        ) : (
          ''
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="first_name">
              First Name
            </label>
            <input
              id="first_name"
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="last_name">
              Last Name
            </label>
            <input
              id="last_name"
              type="text"
              value={last_name}
              onChange={(e) => setlast_name(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
              required
            />
          </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>

          <p className="mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-700 underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
