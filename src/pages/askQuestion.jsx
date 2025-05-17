import React, { useState } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./askQuestion.module.css";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";


function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [tag, setTag] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/question/post-question",
        { title, description, tag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        alert("Question posted successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error posting question:", error.message);
      alert("Failed to post the question. Please try again.");
    }
  };

  return (
    <section className={classes.ask_question}>
      <Link to="/"><button>
            <MdOutlineKeyboardArrowLeft size={35} />
            Back
            </button></Link>
      <form onSubmit={handleSubmit}>
        <h1>Ask a Question</h1>
        <div>
          <label>Title:</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={classes.desc}>Description:</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label className={classes.tag}>Tag:</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          />
        </div>
        <button type="submit">Post Question</button>
      </form>
    </section>
  );
}

export default AskQuestion;
