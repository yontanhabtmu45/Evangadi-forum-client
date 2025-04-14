import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppState } from "../App";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import axios from "../axiosConfig";

function Home() {
  const { user, setUser } = useContext(AppState);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // async function getUser() {
    //   try {
    //     const token = localStorage.getItem("token");
    //     const response = await axios.get("/users/me", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     setUser(response.data);
    //   } catch (error) {
    //     console.log(error.message)
    //   }
    // }

    async function getQuestions() {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        const response = await axios.get("/question/all-questions", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        setQuestions(response.data); // Set the fetched questions to state
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getQuestions();
    // getUser();
  }, []);

  return (
    <section className={classes.question_wrapper}>
      <div className={classes.header_wrapper}>
        <Link to="/ask-question">
          <button>Ask Question</button>
        </Link>
        <div>
          <h2>
            Welcome: <span>{user?.username || "Guest"}</span>
          </h2>
        </div>
      </div>
      <div className={classes.all_questions_wrapper}>
        <div>
          <h1>Questions</h1>
          <hr />
        </div>
        <div className={classes.questions_list}>
          {questions.length > 0 ? (
            questions
              .sort((a, b) => {
                return b.id - a.id;
              })
              .map((question) => (
                <Link to={`/answer/${question.id}`} key={question.id}>
                  <div key={question.id} className={classes.question_item}>
                    <div>
                      <FaUserCircle size={68} />
                      <p>
                        <strong>{question?.username}</strong>
                        <h4>{question?.title}</h4>
                        {/* <p>{question?.description}</p> */}
                      </p>
                      <FaChevronRight size={25} />
                    </div>
                  </div>
                </Link>
              ))
          ) : (
            <p>No questions available</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
