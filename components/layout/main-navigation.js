import Link from "next/link";

import Logo from "./logo";
import classes from "./main-navigation.module.scss";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/'>About</Link>
          </li>
          <li>
            <Link href='/'>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
