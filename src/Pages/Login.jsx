import React,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import { TbMessages } from "react-icons/tb";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

function Login() {

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
     
    } catch (err) {
      setError("Error registering user: " + err.message);
    }
  };
  return (
    <div className="form-container">
      <div className="from-wrapper">
        <span className="logo">
          Tweet{" "}
          <span>
            <TbMessages />
          </span>
        </span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="xyz@abc.com" />
          <input type="password" placeholder="****" />
          <button>Sign in</button>
          {error && (
            <span style={{ color: "red", textAlign: "center" }}>{error}</span>
          )}
        </form>
        <p>You don't have an account? <Link to= '/register'>Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
