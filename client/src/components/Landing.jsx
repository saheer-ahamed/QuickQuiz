import { useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [sessionID, setSessionID] = useState("");
  const nameRef = useRef();
  const navigate = useNavigate()

  const guestUserData = {
    sessionId: "",
    name: "",
    nosQuestions: "",
    correctAnswers: "",
    scorePercentage: "",
  };

  // Use an API call or some other method to fetch the session ID
  const fetchSessionId = async () => {
    try {
      const response = await axios.post("http://localhost:3001/sessionId");
      setSessionID(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameRef.current.value.trim().length === 0) return;
    fetchSessionId()
      .then((response) => {
        const userInfo = {
          ...guestUserData,
          name: nameRef.current.value,
          sessionId: sessionID,
        };
        Cookies.set("user", JSON.stringify(userInfo));
        navigate('/choose-question-numbers')
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <h3>Enter your Name to start!</h3>
      <div className="inputContainer">
        <input type="text" ref={nameRef} placeholder="Enter Name" />
      </div>
      <button className="btn" onClick={handleSubmit}>
        Start Quiz
      </button>
    </>
  );
}
