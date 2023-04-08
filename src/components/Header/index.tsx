
import styles from "./styles.module.scss";
import { SignInButton } from '../SignInButton/index';
import Link from "next/link";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <Link href="/" className={styles.active}>
            Home 
          </Link>
          <Link href="/posts" prefetch>
            Posts
          </Link>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}