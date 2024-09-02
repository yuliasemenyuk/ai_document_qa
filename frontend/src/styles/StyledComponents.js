import styled, { keyframes } from 'styled-components';

export const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5em;
`;

export const SectionTitle = styled.h2`
  color: #444;
  margin-bottom: 20px;
  font-size: 1.8em;
`;

export const FileUploadContainer = styled.div`
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FileInput = styled.input`
  margin-bottom: 15px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const UploadButton = styled(Button)`
  background-color: #4CAF50;
  color: white;

  &:hover {
    background-color: #45a049;
  }
`;

export const QuestionFormContainer = styled.div`
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const QuestionInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
`;

export const AskButton = styled(Button)`
  background-color: #008CBA;
  color: white;

  &:hover {
    background-color: #007B9A;
  }
`;

export const ResultDisplayContainer = styled.div`
  margin-top: 30px;
`;

export const ResultSection = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ResultTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
  font-size: 1.4em;
`;

export const ResultContent = styled.pre`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.9em;
  line-height: 1.4;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

export const Message = styled.div`
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
  background-color: ${props => props.type === 'error' ? '#ffcccc' : '#ccffcc'};
  color: ${props => props.type === 'error' ? '#cc0000' : '#006600'};
`;