import "./MobileMenu.scss";
import { Link } from "react-router-dom";

export default function MobileMenu({ postClickHandler }) {
  return (
    <nav className="mobile-menu">
      <div className="mobile-menu__container">
        <ul className="mobile-menu__list">
          <li className="mobile-menu__item">
            <Link to={"/"} className="mobile-menu__button">
              Home
            </Link>
          </li>
          <li className="mobile-menu__item">
            <button
              onClick={postClickHandler}
              className="mobile-menu__button mobile-menu__button--post">
              New Post
            </button>
          </li>
          <li className="mobile-menu__item">
            <Link className="mobile-menu__button">Search</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
