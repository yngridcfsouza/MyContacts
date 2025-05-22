import styled from "styled-components";

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

  .details {
    margin-left: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    strong {
      color: ${({ theme }) => theme.colors.danger.main};
      display: block;
      margin-bottom: 8px;
    }
  }
`;
