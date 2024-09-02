import React from 'react';
import { ResultDisplayContainer, ResultSection, ResultTitle, ResultContent, SectionTitle } from '../styles/StyledComponents';

function ResultDisplay({ uploadResult, questionResult }) {
  return (
    <ResultDisplayContainer>
      <SectionTitle>Results</SectionTitle>
      {/* {uploadResult && (
        <ResultSection>
          <ResultTitle>Upload Result</ResultTitle>
          <ResultContent>
            {uploadResult.message || JSON.stringify(uploadResult, null, 2)}
          </ResultContent>
        </ResultSection>
      )} */}
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