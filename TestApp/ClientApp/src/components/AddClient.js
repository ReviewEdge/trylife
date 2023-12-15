import React, { useState, useEffect } from 'react';

export const AddClient = () => {
  const [clients, setClients] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/clients')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError('Oops, not JSON!');
        }
  
        return response.json(); // Parse response as JSON
      })
      .then((data) => {
        console.log('Data:', data);
        setClients(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setErrorMessage('Error fetching data');
      });
  }, []);  

  return (
    <main>
      {errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <>
          {clients.length > 0 ? (
            clients.map((client, index) => <h3 key={index}>{client.name}</h3>)
          ) : (
            <div>Loading...</div>
          )}
        </>
      )}
    </main>
  );
};

export default AddClient;