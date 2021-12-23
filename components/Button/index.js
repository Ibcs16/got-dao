import { Container, Text } from "./styles";

const Button = ({ children, ...others }) => {
  if (!children) return null;
  return (
    <Container className="cursor-pointer" {...others}>
      <Text className="silver-text">{children}</Text>
    </Container>
  );
};

export default Button;
