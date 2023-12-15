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

export const ClientForm = ({ onClientAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    children: [],
    phone: '',
    points: 0,
    id: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          children: formData.children,
          phone: parseInt(formData.phone),
          points: parseInt(formData.points),
          id: formData.id
        })
      });

      if (response.ok) {
        console.log('Client created successfully!');
        // You can reset the form or perform other actions after successful creation
        onClientAdded();
      } else {
        console.error('Failed to create client.');
      }
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Children:</label>
          <input type="text" name="children" value={formData.children} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Phone:</label>
          <input type="number" name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Points:</label>
          <input type="number" name="points" value={formData.points} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Id:</label>
          <input type="number" name="id" value={formData.id} onChange={handleChange} />
        </div>

        <button type="button" onClick={handleSubmit}>
          Add New Client
        </button>
      </form>
    </div>
  );
};


export default AddClient;