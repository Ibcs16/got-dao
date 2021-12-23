import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Container = styled.div``;

export const Title = styled.strong`
  display: flex;
  align-items: end;
  position: relative;

  span {
    font-weight: bold;
    font-size: 32px;
    line-height: 38px;
  }

  &:before {
    content: "";
    width: 76px;
    height: 76px;
    background: url("/assets/board_title_wing.png");
    background-size: contain;
    background-position: center;
    margin-bottom: -10px;
  }

  &:after {
    content: "";
    width: 76px;
    height: 76px;
    background: url("/assets/board_title_wing.png");
    background-size: contain;
    background-position: center;
    transform: scaleX(-1);
    margin-bottom: -10px;
  }
`;

export const TitleDivider = styled.img`
  width: 100%;
  max-height: 23px;
  margin-top: 16px;
`;

export const Body = styled.div`
  background: rgba(0, 0, 0, 0.29);
  border-radius: 0px 0px 8px 8px;
  margin-top: -12px;
  padding: 28px 42px;

  ul {
    list-style: none;
    margin: none;
    padding-inline-start: 0;
  }

  li {
    border-bottom: 1px solid rgba(157, 134, 94, 0.9);
    padding-bottom: 4px;
    font-size: 18px;
    line-height: 20px;
  }
`;

export const ColTitle = styled.strong`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
`;
