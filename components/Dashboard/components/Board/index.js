import { Container, Title, Body, TitleDivider } from "./styles";

const Board = ({ title, children, ...others }) => {
  return (
    <Container {...others}>
      <div className="flex flex-col items-center">
        <Title>
          <span className="golden-text">{title}</span>
        </Title>
        <TitleDivider src="/assets/board_title_divider.png" />
      </div>
      <Body>{children}</Body>
    </Container>
  );
};

export default Board;
