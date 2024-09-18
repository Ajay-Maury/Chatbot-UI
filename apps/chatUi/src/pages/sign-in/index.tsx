import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";

const SignIn = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');
  const router = useRouter();

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle the form submission
  const handleSignUp = async () => {
    setFormError('');
    setEmailError('');

    if (!firstName || !lastName || !email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
        firstName,
        lastName,
      });

      if (response.data.error) {
        setFormError(response.data.error);
      } else {
        const { id, first_name, last_name } = response.data;
        const userData = {
          userId: id,
          userName: `${first_name} ${last_name}`,
          email,
        };
        toast.success('User registered successfully!');
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("conversation", JSON.stringify([]));
        router.push(`/chat/${uuidv4()}`); // Redirect after successful login
      }
    } catch (error:any) {
      console.error("Error during sign-up:", error);  // Log the actual error
      if (error.response && error.response.data && error.response.data.error) {
        setFormError(error.response.data.error);
      } else {
        setFormError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '50px', maxWidth: '600px', margin: 'auto' }}>
        <h2 style={{ textAlign: 'center', margin: 'auto', paddingBottom: '30px' }}>Sign In</h2>

        <div style={{ marginBottom: '16px' }}>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmailError('');
              setEmail(e.target.value);
            }}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>

        {formError && <div style={{ color: 'red', marginBottom: '16px' }}>{formError}</div>}

        <button
          onClick={handleSignUp}
          style={{
            padding: '12px 24px',
            backgroundColor: '#2b4078',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <span>Already have an account? </span>
          <a
            href="/login"
            style={{ color: '#2b4078', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Log In
          </a>
        </div>
      </div>
    </>
  );
};

export default SignIn;
