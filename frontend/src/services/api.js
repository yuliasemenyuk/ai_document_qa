const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  console.log(API_BASE_URL, "API_BASE_URL");

  try {
    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const askQuestion = async (question) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error asking question:', error);
    throw error;
  }
};