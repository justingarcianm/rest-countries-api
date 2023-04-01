import { Container, Row, Column } from "../styled/defaults";
import { BsMoon, BsSun } from "react-icons/bs";

export default function Header({ themeOptions }) {
  const handleThemeToggle = () => {
    let themeName = themeOptions.themeSelected.name;
    let themeSelection = themeName === "light-theme" ? "dark-theme" : "light-theme";
    console.log(themeOptions.themeToggle);
    return themeOptions.themeToggle(themeSelection);
  };

  return (
    <header>
      <Container>
        <Row>
          <Column size={"9"}>
            <h1>Where in the World?</h1>
          </Column>
          <Column size={"3"}>
            <button onClick={handleThemeToggle}>
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
