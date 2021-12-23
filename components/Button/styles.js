import styled from "@emotion/styled";

export const Container = styled.button`
  width: fit-content;
  background: transparent;
  padding: 20px 40px;

  background: url("/assets/button_border.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.span`
  font-size: 37px;
  font-weight: normal;
  line-height: 44px;
  text-transform: uppercase;
`;
