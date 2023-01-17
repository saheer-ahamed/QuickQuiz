import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizQuestions } from "../datas/quizQuestions";

export default function EachQuestion() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const currentQuestion = randomQuestions[currentIndex];
  const [correct, setCorrect] = useState(null);
  const [error, setError] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const selectedOption = (answer) => {
    if (answer === currentQuestion.answer) {
      setCorrectAnswers((prev) => prev + 1);
      setCorrect(answer);
    } else {
      setError(answer);
    }
    setIsDisabled(true);
  };

  const nextQuestion = () => {
    setIsDisabled(false);
    let nextIndex = currentIndex + 1;
    if (nextIndex === randomQuestions.length) {
      const user = JSON.parse(Cookies.get("user"));
      Cookies.set(
        "user",
        JSON.stringify({
          ...user,
          correctAnswers: correctAnswers,
        })
      );
      navigate("/result");
    }
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const numberOfQuestions = JSON.parse(Cookies.get("user"))?.nosQuestions;
    let uniqueIndices = new Set();
    let randomObject = [];

    while (randomObject.length < numberOfQuestions) {
      let randomIndex = Math.floor(Math.random() * quizQuestions.length);
      if (!uniqueIndices.has(randomIndex)) {
        uniqueIndices.add(randomIndex);
        randomObject.push(quizQuestions[randomIndex]);
      }
    }
    setRandomQuestions(randomObject);
  }, []);

  return (
    <>
      <h3 className="question">{currentQuestion?.question}</h3>
      <div className="selectOptions">
        {currentQuestion?.options.map((eachOne, id) => (
          <div
            key={id}
            className="choiceOption btn"
            onClick={() => selectedOption(eachOne)}
            style={{
              backgroundColor:
                correct === eachOne ? "green" : error === eachOne ? "red" : "",
              pointerEvents: isDisabled ? "none" : "auto",
            }}
          >
            {eachOne}
          </div>
        ))}
      </div>
      <button className="btn btn-next" onClick={nextQuestion}>
        Next
      </button>
    </>
  );
}
