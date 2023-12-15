import React, { useState, useEffect } from 'react';

export const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/products')
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
        setProducts(data);
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
          {products.length > 0 ? (
            products.map((product, index) => <h3 key={index}>{product.name}</h3>)
          ) : (
            <div>Loading...</div>
          )}
        </>
      )}
    </main>
  );
};

export default AddProduct;