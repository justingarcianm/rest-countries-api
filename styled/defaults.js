import styled from "styled-components";

export const sizes = {
  xl: `(min-width:1921px)`,
  l: `(max-width:1920px)`,
  m: `(max-width:991px)`,
  s: `(max-width:600px)`,
};

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 1rem;
  margin-right: 0;
  margin-left: 0;
`;

export const Row = styled.div`
    width:100%;
    display:flex;
    justify-content:space-evenly;
    align-content-stretch;
    gap:1rem;

    @media ${sizes.m} {
      flex-direction:column;
    }
`;

export const Column = styled.div`
  width: ${(props) => Math.round((parseInt(props.size) / 12) * 100)}%;

  @media ${sizes.m} {
    width: 100%;
  }
`;
