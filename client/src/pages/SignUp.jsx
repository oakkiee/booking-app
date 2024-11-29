import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';


export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null); // To store error messages
  const [loading, setLoading] = useState(false); // To track form submission state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log("FormData updated:", formData); // Log form data to check its values
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form
    setError(null); // Reset any previous error

    // Basic client-side validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      setLoading(false);
      console.log("Form validation failed. Form data:", formData);
      return;
    }

    try {
      console.log("Sending data to API:", formData); // Log data being sent
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log("API Response Status:", res.status); // Log the status code of the response

      if (!res.ok) {
        throw new Error('Failed to sign up: ' + res.statusText);
      }

      const data = await res.json(); // Parse the response as JSON directly
      console.log("API Response Data:", data); // Log the response data

      navigate('/sign-in');

      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error('Error:', error.message); // Log any errors
      
      setError(error.message); // Set the error message to be displayed on the UI
    } finally {
      setLoading(false); // Set loading to false after the operation is complete
      
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
          value={formData.username}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          value={formData.password}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Signing Up...' : 'Sign up'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>} {/* Display error message */}

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
