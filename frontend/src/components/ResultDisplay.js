import React from 'react';
import { ResultDisplayContainer, ResultSection, ResultTitle, ResultContent, SectionTitle } from '../styles/StyledComponents';

function ResultDisplay({ questionResult }) {
  return (
    <ResultDisplayContainer>
      <SectionTitle>Results</SectionTitle>
      {questionResult && (
        <ResultSection>
          <ResultTitle>Question Result</ResultTitle>
          <ResultContent>{JSON.stringify(questionResult, null, 2)}</ResultContent>
        </ResultSection>
      )}
    </ResultDisplayContainer>
  );
}

export default ResultDisplay;