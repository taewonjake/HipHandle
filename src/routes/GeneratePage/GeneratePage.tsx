import styles from "./GeneratePage.module.css";
import GeneratorForm from "../../features/generator/GeneratorForm";

export default function GeneratePage(){
  return (
    <main className={styles.wrap}>
      
      <GeneratorForm />
    </main>
  );
}
