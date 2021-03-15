import styled from 'styled-components';

interface SummaryContainerProps {
  total: number;
}

const colors = {
  red: '#e52e4d',
  green: '#33cc95',
};

export const Container = styled.div<SummaryContainerProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -7.5rem;

  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;

      &.income {
        color: var(--green);
      }

      &.outcome {
        color: var(--red);
      }
    }

    &.highlight-background {
      background: ${({total}) => total>=0 ? colors['green'] : colors['red']};
      color: #fff;
    }
  }
`;
