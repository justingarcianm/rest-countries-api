import { useState } from "react";

import { Container, Row, Column } from "../styled/defaults";
import { BsMoon, BsSun } from "react-icons/bs";

export default function Header({ themeToggler, theme }) {
  const [darkTheme, setDarkTheme] = useState(theme);

  const toggleTheme = () => {
    let themeSetting = !darkTheme;

    if (themeSetting) {
      document.body.setAttribute("data-theme", "dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
      window.localStorage.setItem("theme", "light");
    }

    themeToggler(themeSetting);
    setDarkTheme(themeSetting);
  };

  return (
    <header>
      <Container>
        <Row>
          <Column size={"9"}>
            <h1>Where in the World?</h1>
          </Column>
          <Column size={"3"}>
            <button onClick={toggleTheme}>
              <BsMoon />
              <BsSun />
              Dark Mode
            </button>
          </Column>
        </Row>
      </Container>
    </header>
  );
}
