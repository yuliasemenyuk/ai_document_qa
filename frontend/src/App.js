import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import QuestionForm from './components/QuestionForm';
import ResultDisplay from './components/ResultDisplay';
import { AppContainer, Title } from './styles/StyledComponents';

function App() {
  const [uploadResult, setUploadResult] = useState(null);
  const [questionResult, setQuestionResult] = useState(null);

  return (
    <AppContainer>
      <Title>AI-Enhanced Document QA System</Title>
      <FileUpload setUploadResult={setUploadResult} />
      <QuestionForm setQuestionResult={setQuestionResult} />
      <ResultDisplay uploadResult={uploadResult} questionResult={questionResult} />
    </AppContainer>
  );
}

export default App;