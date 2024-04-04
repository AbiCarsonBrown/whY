import "../Header/Header.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <section className="header__container">
        <Link to={"/"}>
          <img src={logo} alt="website logo" className="header__logo" />
        </Link>
      </section>
    </header>
  );
}
