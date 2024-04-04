import "./ContentPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import ThoughtCard from "../../components/ThoughtCard/ThoughtCard";
import AddPost from "../../components/AddPost/AddPost";
import { Navigate } from "react-router-dom";
import MobileMenu from "../../components/MobileMenu/MobileMenu";

export default function ContentPage() {
  const URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);

  const [thoughtsList, setThoughtsList] = useState(null);
  const [showPost, setShowPost] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const fetchThoughts = async () => {
    try {
      const { data } = await axios.get(URL);
      setThoughtsList(data);
      console.log(thoughtsList);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  if (userData) {
    // allow post and hide sign up button
  } else if (userData === null) {
    // if userData exist in local storage
    return <Navigate to="/signup" />;
  }

  const likePostHandler = async (id) => {
    await axios.put(`${URL}/${id}`);
    fetchThoughts();
  };

  const deletePostHandler = async (id) => {
    await axios.delete(`${URL}/${id}`);
    fetchThoughts();
  };

  const newPostHandler = async (event) => {
    event.preventDefault();
    let formIsValid = true;
    const errors = {};
    const newPost = {
      user: userData.username,
      post: event.target.post.value,
    };
    if (!event.target.post.value) {
      formIsValid = false;
      errors["post"] = "You must enter a post";
    }
    if (!formIsValid) {
      return setFormErrors(errors);
    }
    await axios.post(URL, newPost);
    event.target.reset();
    fetchThoughts();
    setShowPost(false);
  };

  const postClickHandler = () => {
    setShowPost(!showPost);
  };

  if (thoughtsList === null) {
    return "..Loading";
  }

  return (
    <main className="main">
      <section className="feed">
        <div className="feed__container">
          <h2 className="feed__title">Feed</h2>
          <ul className="feed__list">
            {thoughtsList.map((thought) => (
              <li className="feed__item" key={thought.id}>
                <ThoughtCard
                  id={thought.id}
                  username={thought.user}
                  timestamp={thought.timestamp}
                  thought={thought.post}
                  replies={thought.replies.length}
                  likes={thought.likeCount}
                  deletePostHandler={deletePostHandler}
                  likePostHandler={likePostHandler}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className={`new ${showPost ? "new--show" : ""}`}>
        <AddPost newPostHandler={newPostHandler} errors={formErrors} />
      </div>
      <MobileMenu postClickHandler={postClickHandler} />
    </main>
  );
}
