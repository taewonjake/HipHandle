import React, { useState } from "react";
import styles from "./GeneratorForm.module.css";
import { Link, useNavigate } from "react-router-dom"; // 홈으로 이동용
import logo from "../../assets/logo.svg";              // 로고 경로는 프로젝트에 맞게 조정
import { generateCandidates } from "../../core/generator";
import { useGeneratorStore } from "../../store/generatorStore";
import type { RuleId } from "../../core/types";

type LocalState = {
  name: string;
  nickname: string;
  birthday: string;
  favoriteText: string;
  hipLevel: number;
  selectedRules: RuleId[];
};

const RULES: { id: RuleId; title: string; desc: string }[] = [
  { id: "initialLetters", title: "앞글자 따오기", desc: "문장의 첫 글자 추출" },
  { id: "leet", title: "알파벳→숫자 치환", desc: "l→1, e→3, o→0 등" },
  { id: "reverse", title: "거꾸로 쓰기", desc: "이름이나 단어를 뒤집기" },
  { id: "nickname", title: "별명 기반", desc: "평소 별명/애칭 활용" },
  { id: "hangulQwerty", title: "한글→영문자판", desc: "한글을 영문자판 그대로" },
  { id: "birthdayInsert", title: "생일 숫자 삽입", desc: "중간에 생일 숫자 삽입" },
  { id: "keyboardMash", title: "키보드 매시업", desc: "인접 키보드 무작위 치환" },
  { id: "minimizeSymbols", title: "특수문자 최소화", desc: "불필요한 기호 제거" },
];

export default function GeneratorForm() {
  const nav = useNavigate();
  const { input, setInput, setCandidates } = useGeneratorStore();

  const [local, setLocal] = useState<LocalState>({
    name: input.name || "",
    nickname: input.nickname || "",
    birthday: input.birthday || "",
    favoriteText: input.favoriteText || "",
    hipLevel: input.hipLevel ?? 50,
    selectedRules: (input.selectedRules || ["initialLetters", "nickname"]) as RuleId[],
  });

  const update = (patch: Partial<LocalState>) => setLocal((p) => ({ ...p, ...patch }));
  const favLen = local.favoriteText?.length ?? 0;

  const toggleRule = (id: RuleId) => {
    setLocal((prev) => ({
      ...prev,
      selectedRules: prev.selectedRules.includes(id)
        ? (prev.selectedRules.filter((x) => x !== id) as RuleId[])
        : ([...prev.selectedRules, id] as RuleId[]),
    }));
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const results = generateCandidates(local as any);
    setInput(local as any);
    setCandidates(results);
    nav("/results");
  };

  return (
    <div className={styles.page}>
      {/* 상단바: 홈(로고) 버튼 */}
      <header className={styles.topbar}>
        <Link to="/" className={styles.brand} aria-label="홈으로 이동">
          <img src={logo} alt="HipHandle" className={styles.brandLogo} />
        </Link>
      </header>

      <div className={styles.container}>
        <h1 className={styles.heading}>힙한 아이디 생성기</h1>
        <p className={styles.sub}>
          아래 정보를 입력하면 트렌디한 SNS 아이디를 자동으로 만들어드려요
        </p>

        <form className={styles.card} onSubmit={onSubmit}>
          {/* 이름 / 별명 */}
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>
                이름 <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                placeholder="예: minsu"
                value={local.name}
                onChange={(e) => update({ name: e.target.value })}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>별명/닉네임</label>
              <input
                type="text"
                placeholder="예: panda"
                value={local.nickname}
                onChange={(e) => update({ nickname: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>

          {/* 생년월일 */}
          <div className={styles.field}>
            <label className={styles.label}>생년월일</label>
            <div className={styles.dateRow}>
              <button
                type="button"
                className={styles.signBtn}
                aria-label="구분자 넣기/빼기"
                onClick={() => {
                  const v = local.birthday || "";
                  update({
                    birthday:
                      v && v.includes("-")
                        ? v.replaceAll("-", "")
                        : v.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"),
                  });
                }}
              >
                ±/-
              </button>
              <input
                type="date"
                value={(local.birthday || "").slice(0, 10)}
                onChange={(e) => update({ birthday: e.target.value })}
                className={`${styles.input} ${styles.dateInput}`}
              />
              
            </div>
          </div>

          {/* 좋아하는 문장/단어 */}
          <div className={styles.field}>
            <label className={styles.label}>좋아하는 문장/단어</label>
            <textarea
              placeholder="예: I wanna go home early"
              value={local.favoriteText}
              onChange={(e) => update({ favoriteText: e.target.value.slice(0, 500) })}
              className={styles.textarea}
              maxLength={500}
            />
            <div className={styles.counter}>{favLen}/500</div>
          </div>

          {/* 힙 레벨 */}
          <div className={styles.field}>
            <label className={styles.label}>힙 레벨</label>
            <div className={styles.sliderWrap}>
              <div className={styles.sliderRow}>
                <span>보수적</span>
                <span className={styles.percent}>{local.hipLevel}%</span>
                <span>과감</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={local.hipLevel}
                onChange={(e) => update({ hipLevel: Number(e.target.value) })}
                className={styles.slider}
              />
            </div>
          </div>

          {/* 변환 규칙 선택 */}
          <div className={styles.field}>
            <label className={styles.label}>적용할 변환 규칙 선택</label>
            <div className={styles.radioGrid}>
              {RULES.map((r) => {
                const checked = local.selectedRules.includes(r.id);
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => toggleRule(r.id)}
                    className={`${styles.ruleCard} ${checked ? styles.ruleChecked : ""}`}
                    aria-pressed={checked}
                  >
                    <div>
                      <div className={styles.ruleTitle}>{r.title}</div>
                      <div className={styles.ruleDesc}>{r.desc}</div>
                    </div>
                    <span
                      className={`${styles.checkCircle} ${checked ? styles.checkOn : ""}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 제출 */}
          <div className={styles.submitWrap}>
            <button type="submit" className={styles.submitBtn}>
              ✨ 힙한 아이디 생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
