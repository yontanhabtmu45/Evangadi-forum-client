import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import classes from "./SingleQuestion.module.css";

function SingleQuestion() {
  const { id } = useParams(); // Get the question ID from the URL
  const [question, setQuestion] = useState(null); // State to store question details
  const [answers, setAnswers] = useState([]); // State to store answers
  const [newAnswer, setNewAnswer] = useState(""); // State to store the new answer

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await axios.get(`/question/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
        if (response.status === 200) {
          setQuestion(response.data); // Set the fetched question to state
        }
      } catch (error) {
        console.error("Error fetching question:", error.message);
      }
    }

    async function fetchAnswers() {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await axios.get(`/answer/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
        if (response.status === 200) {
          setAnswers(response.data); // Set the fetched answers to state
        }
      } catch (error) {
        console.error("Error fetching answers:", error.message);
      }
    }

    fetchQuestion();
    fetchAnswers();
  }, [id]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await axios.post(
        `/answer/${id}`,
        { answer: newAnswer }, // Send the new answer in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      if (response.status === 201) {
        alert("Answer posted successfully!");
        setNewAnswer(""); // Clear the input field
        setAnswers((prevAnswers) => [
          ...prevAnswers,
          { answer: newAnswer, username: "You" },
        ]); // Update the answers list
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
