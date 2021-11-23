import styled from "styled-components";

export const AppContainer = styled.div`
  display: grid;
`;

export const AppGrid = styled.div`
  height: calc(100vh - 67px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: minmax(320px, 400px) minmax(320px, 1fr);
  }
`;
