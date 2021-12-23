import styled from "@emotion/styled";

export const Coin = styled.img`
  width: 64px;
  height: 64px;
  filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25));
`;

export const Address = styled.span`
  font-size: 28px;
  line-height: 34px;
  opacity: 0.5;

  background: -webkit-linear-gradient(
    top,
    #ffffff 21%,
    rgba(255, 255, 255, 0.21) 100%
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
