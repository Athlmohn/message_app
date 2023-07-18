// Import the required modules and components
import React, { useState } from "react";
import { TbMessages } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";
import { auth, db, storage } from "../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate,Link } from "react-router-dom";

function Register() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create a user with email and password
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Upload the image to Firebase Storage
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          // Handle unsuccessful uploads
          setError("Error uploading image: " + error.message);
        },
        async () => {
          // Image upload successful, get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Update user profile with displayName and photoURL
          await updateProfile(response.user, {
            displayName,
            photoURL: downloadURL,
          });

          // Add user details to the Firestore database
          await setDoc(doc(db, "users", response.user.uid), {
            uid: response.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          // Add user chats to the Firestore database
          await setDoc(doc(db, "userChats", response.user.uid), {});

          // Navigate to the homepage after successful registration
          navigate("/");
        }
      );
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
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="username" />
          <input type="email" placeholder="xyz@abc.com" />
          <input type="password" placeholder="****" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <RxAvatar size={30} /> <span>Upload Avatar</span>
          </label>
          <button>Sign Up</button>
          {error && (
            <span style={{ color: "red", textAlign: "center" }}>{error}</span>
          )}
        </form>
        <p>Already have an account? <Link to= '/login'>Signin</Link></p>
      </div>
    </div>
  );
}

export default Register;
