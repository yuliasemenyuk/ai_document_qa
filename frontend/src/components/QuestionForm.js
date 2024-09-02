import React, { useState } from 'react';
import { QuestionFormContainer, QuestionInput, AskButton, SectionTitle, LoadingSpinner, Message } from '../styles/StyledComponents';
import { askQuestion } from '../services/api';

function QuestionForm({ setQuestionResult }) {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    setError(null);
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      setError({ message: 'Please enter a question.' });
      setQuestionResult(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setQuestionResult(null); 

    try {
      const result = await askQuestion(question);
      setQuestionResult(result);
    } catch (error) {
      console.error('Error asking question:', error);
      setQuestionResult(null);
      if (error.response && error.response.data) {
        const { message, details } = error.response.data;
        setError({ 
          message: message || 'An error occurred while processing your question.',
          details: details
        });
      } else {
        setError({ message: 'Failed to get an answer. Please try again.' });
      }
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
        {isLoading ? 'Processing...' : 'Ask'}
      </AskButton>
      {isLoading && <LoadingSpinner />}
      {error && (
        <Message type="error">
          {error.message}
          {error.details && (
            <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
              Details: {error.details}
            </div>
          )}
        </Message>
      )}
    </QuestionFormContainer>
  );
}

export default QuestionForm;