import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axiosConfig";
import classes from "./SingleQuestion.module.css";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";


function SingleQuestion() {
  const { id } = useParams(); 
  const [question, setQuestion] = useState(null); 
  const [answers, setAnswers] = useState([]); 
  const [newAnswer, setNewAnswer] = useState(""); 

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(`/question/questions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (response.status === 200) {
          setQuestion(response.data); 
        }
      } catch (error) {
        console.error("Error fetching question:", error.message);
      }
    }

    async function fetchAnswers() {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(`/answer/answers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (response.status === 200) {
          setAnswers(response.data); 
        }
      } catch (error) {
        console.error("Error fetching answers:", error.message);
      }
    }

    fetchQuestion();
    fetchAnswers();
  }, [id]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(
        `/answer/${id}`,
        { answer: newAnswer }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      if (response.status === 201) {
        alert("Answer posted successfully!");
        setNewAnswer(""); 
        setAnswers((prevAnswers) => [
          ...prevAnswers,
          { answer: newAnswer, username: "You" },
        ]); 
      }
    } catch (error) {
      console.error("Error posting answer:", error.message);
      alert("Failed to post the answer. Please try again.");
    }
  };

  if (!question) {
    return <p>Loading...</p>;
  }

  return (
    <section className={classes.single_question}>
        <div className={classes.title}>
          <Link to="/"><button>
            <MdOutlineKeyboardArrowLeft size={35} />
            Back
            </button></Link>
          <h1>{question?.title}</h1>
          <h4>{question?.description}</h4>
        </div>
      <div className={classes.question_wrap}>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: "10px",
            fontSize: "1.2rem",
          }}
        >
          <strong>Asked by:</strong>
          <p style={{ color: "brown" }}> {question?.username || "Guest"}</p>
        </p>
        <p className={classes.tag}>
          <strong>Tag:</strong>
          <p>{question?.tag}</p>
        </p>

        <h2>Answers</h2>
        {answers.length > 0 ? (
          answers
            .sort((a, b) => b.id - a.id)
            .map((answer, index) => (
              <div key={index} className={classes.answers}>
                <p>
                  <strong style={{ color: "purple" }}>
                    {answer.username || "Guest"}:
                  </strong>{" "}
                  {answer.answer}
                </p>
              </div>
            ))
        ) : (
          <p>No answers yet. Be the first to answer!</p>
        )}

        <form onSubmit={handleAnswerSubmit}>
          <h3>Post Your Answer</h3>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit Answer</button>
        </form>
      </div>
    </section>
  );
}

export default SingleQuestion;
