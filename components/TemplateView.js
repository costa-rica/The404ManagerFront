import styles from "../styles/TemplateView.module.css";
import NavigationBar from "./NavigationBar";

export default function TemplateView({ children, logPage, title }) {
  return (
    <>
      <header className={styles.headerCustom}>
        {title}
        <NavigationBar />
      </header>
      <main className={styles.mainCustom}>{children}</main>
    </>
  );
}
