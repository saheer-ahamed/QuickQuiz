import tick from "../images/tick.png";
import percent from "../images/percent.png";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const [answers, setAnswers] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [name, setName] = useState(null);
  const navigate = useNavigate()

  const handleOnceMore = () => {
    Cookies.set('user','', { expires: -1})
    navigate('/')
  };

  useEffect(() => {
    const correctAnswers = JSON.parse(Cookies.get("user"))?.correctAnswers;
    const numberOfQuestions = JSON.parse(Cookies.get("user"))?.nosQuestions;
    const userName = JSON.parse(Cookies.get("user"))?.name;

    const answerPercent = (correctAnswers / numberOfQuestions) * 100;
    setName(userName);
    setPercentage(answerPercent);
    setAnswers(correctAnswers);
  }, []);
  return (
    <>
      <h4 className="callingUser">Hey, {name}!</h4>
      <h3 className="thankyou">Thank you for taking the Quiz.</h3>
      <div className="showResults">
        <div className="correctScore">
          <div className="tickIcon iconContainer">
            <img src={tick} alt="success" />
          </div>
          <div>
            <h4>{answers}</h4>
            <p>Corrent Answers</p>
          </div>
        </div>
        <div className="correctScore">
          <div className="percentIcon iconContainer">
            <img src={percent} alt="percentage" />
          </div>
          <div>
            <h4>{percentage}%</h4>
            <p>Percentage</p>
          </div>
        </div>
      </div>
      <button className="btn btn-oncemore" onClick={handleOnceMore}>
        Take once more
      </button>
    </>
  );
}
