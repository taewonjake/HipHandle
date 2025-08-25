import styles from "./HomePage.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logodark.svg";

export default function HomePage() {
  const nav = useNavigate();//페이지 이동 함수

  return (
    <div className={styles.page}>
      {/* 메인 시작 화면 */}
      <section className={styles.hero}>
        <h1 className={styles.title}>
          힙한 SNS 아이디를 <span className={styles.highlight}>자동으로</span> 만들어보세요
        </h1>

        <p className={styles.sub}>
          더 이상 아이디 고민하지 마세요. HipHandle이 당신만의 개성 있고 트렌디한 SNS 아이디를 자동으로 생성해드립니다.
        </p>

        <Button className={styles.cta} onClick={() => nav("/generate")}>
          ✨ 아이디 만들기 시작
        </Button>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.brand}>
            <img src={logo} alt="HipHandle" className={styles.logo} />
            
          </div>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Contact">✉️</a>
          </div>
        </div>
        <div className={styles.copy}>© 2025 HipHandle. All rights reserved.</div>
      </footer>
    </div>
  );
}
