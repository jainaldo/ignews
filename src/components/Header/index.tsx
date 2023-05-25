
import styles from "./styles.module.scss";
import { SignInButton } from '../SignInButton/index';
import { ActiveLink } from "../ActiveLink";
import { FALSE } from "sass";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            Home 
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            Posts
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}