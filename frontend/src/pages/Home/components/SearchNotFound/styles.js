import styled from "styled-components";

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  span {
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-left: 24px;
    word-break: break-word;
  }
`;
