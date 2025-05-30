import styled, { keyframes } from "styled-components";

const load = keyframes`
  0% {
    box-shadow:
      0 -1.5em 0 0em #7159c1,
      1.05em -1.05em 0 0em rgba(113, 89, 193, 0.2),
      1.5em 0 0 0em rgba(113, 89, 193, 0.2),
      1.05em 1.05em 0 0em rgba(113, 89, 193, 0.2),
      0 1.5em 0 0em rgba(113, 89, 193, 0.2),
      -1.05em 1.05em 0 0em rgba(113, 89, 193, 0.2),
      -1.5em 0 0 0em rgba(113, 89, 193, 0.5),
      -1.05em -1.05em 0 0em rgba(113, 89, 193, 0.7);
  }
  12.5% {
    box-shadow:
      0 -1.5em 0 0em rgba(113, 89, 193, 0.7),
      1.05em -1.05em 0 0em #7159c1,
      1.5em 0 0 0em rgba(113, 89, 193, 0.2),
      1.05em 1.05em 0 0em rgba(113, 89, 193, 0.2),
      0 1.5em 0 0em rgba(113, 89, 193, 0.2),
      -1.05em 1.05em 0 0em rgba(113, 89, 193, 0.2),
      -1.5em 0 0 0em rgba(113, 89, 193, 0.5),
      -1.05em -1.05em 0 0em rgba(113, 89, 193, 0.5);
  }
  25% {
    box-shadow:
      0 -1.5em 0 0em rgba(113, 89, 193, 0.5),
      1.05em -1.05em 0 0em rgba(113, 89, 193, 0.7),
      1.5em 0 0 0em #7159c1,
      1.05em 1.05em 0 0em rgba(113, 89, 193, 0.2),
      0 1.5em 0 0em rgba(113, 89, 193, 0.2),
      -1.05em 1.05em 0 0em rgba(113, 89, 193, 0.2),
      -1.5em 0 0 0em rgba(113, 89, 193, 0.2),
      -1.05em -1.05em 0 0em rgba(113, 89, 193, 0.5);
  }
  37.5% {
    box-shadow:
      0 -1.5em 0 0em rgba(113, 89, 193, 0.5),
      1.05em -1.05em 0 0em rgba(113, 89, 193, 0.5),
      1.5em 0 0 0em rgba(113, 89, 193, 0.7),
      1.05em 1.05em 0 0em #7159c1,
      0 1.5em 0 0em rgba(113, 89, 193, 0.2),
      -1.05em 1.05em 0 0em rgba(113, 89, 193, 0.2),
      -1.5em 0 0 0em rgba(113, 89, 193, 0.2),
      -1.05em -1.05em 0 0em rgba(113, 89, 193, 0.2);
  }
  100% {
    box-shadow:
      0 -1.5em 0 0em #7159c1,
      1.05em -1.05em 0 0em rgba(113, 89, 193, 0.2),
      1.5em 0 0 0em rgba(113, 89, 193, 0.2),
      1.05em 1.05em 0 0em rgba(113, 89, 193, 0.2),
      0 1.5em 0 0em rgba(113, 89, 193, 0.2),
      -1.05em 1.05em 0 0em rgba(113, 89, 193, 0.2),
      -1.5em 0 0 0em rgba(113, 89, 193, 0.2),
      -1.05em -1.05em 0 0em rgba(113, 89, 193, 0.5);
  }
`;

const round = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

export const StyledSpinner = styled.div`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ size }) => `${size}px`};
  width: 1em;
  height: 1em;
  border-radius: 50%;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${load} 1.7s infinite ease, ${round} 1.7s infinite ease;
  animation: ${load} 1.7s infinite ease, ${round} 1.7s infinite ease;
`;
