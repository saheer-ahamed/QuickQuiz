import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuestionNos() {
  const [questions, setQuestions] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const divs = [4, 6, 8, 10];
  const navigate = useNavigate();

  const questionOption = (num) => {
    setQuestions(num);
    setIsActive(num);
    setIsDisabled(true)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const choosenNumber = questions;
      let user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

      Cookies.set(
        "user",
        JSON.stringify({
          ...user,
          nosQuestions: choosenNumber,
        })
      );
      navigate("/question");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3>Select Number of Questions</h3>
      <div className="selectCircle">
        {divs.map((div) => (
          <div
            key={div}
            className="choiceCircle"
            onClick={() => questionOption(div)}
            style={{
              backgroundColor: isActive === div ? "lightgray" : "",
              pointerEvents: isDisabled ? "none" : "auto",
            }}
          >
            {div}
          </div>
        ))}
      </div>
      <button className="btn btn-next" onClick={handleSubmit}>
        Next
      </button>
    </>
  );
}
