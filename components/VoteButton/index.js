import { Container } from "./styles";

const VoteButton = ({ children, disabled, ...others }) => {
  console.log(disabled);
  if (!children) return null;
  return (
    <Container
      className={`${
        !disabled ? "bg-voteBtn" : "bg-voteBtnDisabled"
      } bg-contain bg-no-repeat cursor-pointer`}
      disabled={disabled}
      {...others}
    >
      {children}
    </Container>
  );
};

export default VoteButton;
