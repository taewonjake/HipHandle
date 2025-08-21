import { Link } from "react-router-dom";
import styles from "./Topbar.module.css";
import logo from "../../assets/logo.svg";

export default function Topbar() {
  return (
    <header className={styles.topbar}>
      <Link to="/" className={styles.brand} aria-label="홈으로 이동">
        <img src={logo} alt="HipHandle" className={styles.brandLogo} />
      </Link>
    </header>
  );
}
