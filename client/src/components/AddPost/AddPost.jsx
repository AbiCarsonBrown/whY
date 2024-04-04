import "./AddPost.scss";

export default function AddPost({ newPostHandler, formErrors }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(formErrors);
  return (
    <section className="new-post">
      <div className="new-post__wrapper">
        <h3 className="new-post__user">{userData.username}</h3>
        <form className="new-post__form" onSubmit={newPostHandler}>
          <textarea
            className="new-post__content"
            id="post"
            name="post"
            maxLength="300"
          />
          <p
            className={`new-post__error ${
              !formErrors ? "new-post__error--none" : ""
            }`}>
            You must enter a post
          </p>
          <button className="new-post__submit">💭</button>
        </form>
      </div>

      <div className="new-post__bubble new-post__bubble--top"></div>
      <div className="new-post__bubble new-post__bubble--middle"></div>
      <div className="new-post__bubble new-post__bubble--bottom"></div>
    </section>
  );
}
