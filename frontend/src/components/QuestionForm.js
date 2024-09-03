import React, { useState } from "react";
import {
  QuestionFormContainer,
  QuestionInput,
  AskButton,
  SectionTitle,
  LoadingSpinner,
  Message,
  ResultContainer
} from "../styles/StyledComponents";
import { askQuestion } from "../services/api";

function QuestionForm() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleQuestionChange = (e) => {
      setQuestion(e.target.value);
      setError(null);
    };
  
    const handleAskQuestion = async () => {
      if (!question.trim()) {
        setError({ message: 'Please enter a question.' });
        setAnswer('');
        return;
      }
  
      setIsLoading(true);
      setError(null);
      setAnswer('');
  
      try {
        const result = await askQuestion(question);
        setAnswer(result.answer);
      } catch (error) {
        console.error('Error asking question:', error);
        setError({ 
          message: error.response?.data?.error || 'Failed to get an answer. Please try again.'
        });
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
        {error && <Message type="error">{error.message}</Message>}
        {answer && (
          <ResultContainer>
            <SectionTitle>Answer</SectionTitle>
            <p>{answer}</p>
          </ResultContainer>
        )}
      </QuestionFormContainer>
    );
  }
  
  export default QuestionForm;
