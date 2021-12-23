import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const TabName = styled.strong`
  font-weight: bold;
  font-size: 26.7541px;
  line-height: 32px;
`;

export const ArrowIcon = styled.img`
  width: 22px;
  height: 14px;

  ${({ flip }) => {
    flip &&
      css`
        transform: scaleX(-1);
      `;
  }}
`;
