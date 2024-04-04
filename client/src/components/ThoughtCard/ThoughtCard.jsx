import "./ThoughtCard.scss";

export default function ThoughtCard({
  id,
  username,
  timestamp,
  thought,
  replies,
  likes,
  deletePostHandler,
  likePostHandler,
}) {
  timestamp = new Date(timestamp).toLocaleTimeString();

  return (
    <article className="thought">
      <div className="thought__info">
        <h3 className="thought__username">{username}</h3>

        <p className="thought__timestamp">{timestamp}</p>
        <button
          className="thought__delete-button"
          onClick={() => {
            deletePostHandler(id);
          }}
        >
          x
        </button>
      </div>

      <p className="thought__thought">{thought}</p>

      <div className="thought__buttons">
        <div className="thought__replies-container">
          <button className="thought__reply-button">Reply</button>
          <span>{replies}</span>
        </div>
        <div className="thought__likes-container">
          <button
            className="thought__like-button"
            onClick={() => {
              likePostHandler(id);
            }}
          >
            ❤️
          </button>
          <span>{likes} Likes</span>
        </div>
      </div>
    </article>
  );
}
