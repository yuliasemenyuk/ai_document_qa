import React, { useState } from 'react';
import { FileUploadContainer, FileInput, UploadButton, SectionTitle, LoadingSpinner, Message } from '../styles/StyledComponents';
import { uploadFile } from '../services/api';

function FileUpload({ setUploadResult }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a file first!' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const result = await uploadFile(file);
      setUploadResult(result);
      setMessage({ type: 'success', text: result.message });
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage({ type: 'error', text: 'Failed to upload file' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FileUploadContainer>
      <SectionTitle>Upload Document</SectionTitle>
      <FileInput type="file" onChange={handleFileChange} disabled={isLoading} />
      <UploadButton onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </UploadButton>
      {isLoading && <LoadingSpinner />}
      {message && <Message type={message.type}>{message.text}</Message>}
    </FileUploadContainer>
  );
}

export default FileUpload;