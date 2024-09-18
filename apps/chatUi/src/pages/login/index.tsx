import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const router = useRouter();

  // Handle form submission
  const handleLogin = async () => {
    setFormError("");

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      if (response.data.error) {
        setFormError(response.data.error);
      } else {
        // Save user data to local storage
        console.log("response.data:", response.data);
        const { id, first_name, last_name } = response.data;
        const userData = {
          userId: id,
          userName: `${first_name} ${last_name}`,
          email,
        };
        toast.success("Login successful!");
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("conversation", JSON.stringify([]));
        router.push(`/chat/${uuidv4()}`); // Redirect after successful login
      }
    } catch (error) {
      setFormError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "50px", maxWidth: "600px", margin: "auto" }}>
        <h2 style={{ textAlign: "center", margin: "auto", paddingBottom: "30px" }}>Log In</h2>

        <div style={{ marginBottom: "16px" }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "4px" }} />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "4px" }} />
        </div>

        {formError && <div style={{ color: "red", marginBottom: "16px" }}>{formError}</div>}

        <button
          onClick={handleLogin}
          style={{
            padding: "12px 24px",
            backgroundColor: "#2b4078",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Log In
        </button>

        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <span>Don't have an account? </span>
          <a href="/sign-in" style={{ color: "#2b4078", cursor: "pointer", textDecoration: "underline" }}>
            Sign In
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
