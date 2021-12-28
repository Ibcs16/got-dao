import styled from "@emotion/styled";

export const Coin = styled.img`
  width: 180px;
  height: 180px;
  margin-bottom: 80px;
  margin-top: 60px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > span {
    color: white;
    text-transform: uppercase;

    font-family: Trajan Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 42px;

    text-align: center;
    margin-top: 24px;
  }
`;
