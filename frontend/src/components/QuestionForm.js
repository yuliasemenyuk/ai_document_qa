import React, { useState } from 'react';
import { QuestionFormContainer, QuestionInput, AskButton, SectionTitle, LoadingSpinner, Message } from '../styles/StyledComponents';
import { askQuestion } from '../services/api';

function QuestionForm({ setQuestionResult }) {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    setMessage(null);
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      setMessage({ type: 'error', text: 'Please enter a question!' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const result = await askQuestion(question);
      setQuestionResult(result);
      setMessage({ type: 'success', text: 'Question answered successfully' });
    } catch (error) {
      console.error('Error asking question:', error);
      setMessage({ type: 'error', text: 'Failed to get an answer' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <QuestionFormContainer>
      <SectionTitle>Ask a Question</SectionTitle>
      <QuestionInput
        type="text"
        value={question}
        onChange={handleQuestionChange}
        placeholder="Enter your question here"
        disabled={isLoading}
      />
      <AskButton onClick={handleAskQuestion} disabled={isLoading}>
        {isLoading ? 'Asking...' : 'Ask'}
      </AskButton>
      {isLoading && <LoadingSpinner />}
      {message && <Message type={message.type}>{message.text}</Message>}
    </QuestionFormContainer>
  );
}

export default QuestionForm;