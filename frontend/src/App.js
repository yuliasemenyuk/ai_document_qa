import React from 'react';
import { AppContainer, Title } from './styles/StyledComponents';
import FileUpload from './components/FileUpload';
import QuestionForm from './components/QuestionForm';

function App() {
  return (
    <AppContainer>
      <Title>AI-Enhanced Document QA System</Title>
      <FileUpload />
      <QuestionForm />
    </AppContainer>
  );
}

export default App;