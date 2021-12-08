import React, { useState } from "react";
import "./App.css";
import { fetchQuizQuestions, QuestionsState } from "./API";
import QuestionCard from "./components/QuestionCard";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

// number of questions per game
const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, "easy");
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // get user answer
      const answer = e.currentTarget.value;
      // check if the answer is correct
      const correct = questions[questionNumber].correct_answer === answer;
      // add to the score if the answer is correct
      if (correct) {
        setScore((prev) => prev + 1);
      }
      // save the correct answer to the array of user answers
      const answerObject = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // move on to the next question if not the last question
    const nextQuestionNumber = questionNumber + 1;
    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQuestionNumber);
    }
  };

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}

      {!gameOver && <p className="score">Score: {score}</p>}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={questionNumber + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[questionNumber].question}
          answers={questions[questionNumber].answers}
          userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswers.length === questionNumber + 1 &&
      questionNumber !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
}

export default App;
