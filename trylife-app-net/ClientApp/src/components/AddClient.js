import React, { useState, useEffect } from 'react';

export const AddClient = () => {
  const [clients, setClients] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/clients')
      .then((response) => {
        console.log('Response received:', response);
        if (!response.ok) {
          // throw new Error('Network response was not ok');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulatedData = ''; 

        const readStream = () => {
          return reader.read().then(({ done, value }) => {
            if (done) {
              console.log('Stream reading complete');
              console.log('Accumulated Data:', accumulatedData); // Use the accumulated data here
              return; // Exit when done
            }
    
            // Process the received chunk and append to the accumulated data
            if (value) {
              const chunk = decoder.decode(value, { stream: true }); // Decode the chunk
              accumulatedData += chunk; // Append chunk to the accumulated data
            }
    
            // Continue reading next chunk
            return readStream();
          }).catch((error) => {
            console.error('Error reading the stream:', error);
            // Handle errors here
          });
        };
        readStream();
        
        console.log("Type Checking...")
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.log('Oops, not JSON!');
        }
        return response.json();
      })
      .then((data) => {
        try {
          const json = JSON.parse(JSON.stringify(data));
          console.log('JSON:', json);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
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
