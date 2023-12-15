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



export const ProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    ageRangeMonthsStart: '',
    ageRangeMonthsEnd: '',
    points: '',
    training: 'None'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          category: formData.category,
          age_range_months_start: parseInt(formData.ageRangeMonthsStart),
          age_range_months_end: parseInt(formData.ageRangeMonthsEnd),
          points: parseInt(formData.points),
          training: formData.training
        })
      });

      if (response.ok) {
        console.log('Product created successfully!');
        // You can reset the form or perform other actions after successful creation
        onProductAdded();
      } else {
        console.error('Failed to create product.');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <form>
      <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div>
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </div>

        <div>
          <label>Age Range (Months) - Start:</label>
          <input type="number" name="ageRangeMonthsStart" value={formData.ageRangeMonthsStart} onChange={handleChange} />
        </div>

        <div>
          <label>Age Range (Months) - End:</label>
          <input type="number" name="ageRangeMonthsEnd" value={formData.ageRangeMonthsEnd} onChange={handleChange} />
        </div>

        <div>
          <label>Points:</label>
          <input type="number" name="points" value={formData.points} onChange={handleChange} />
        </div>

        <div>
          <label>Training:</label>
          <select name="training" value={formData.training} onChange={handleChange}>
            <option value="None">None</option>
            {/* Add other training options if needed */}
          </select>
        </div>

        <button type="button" onClick={handleSubmit}>
          Add New Product
        </button>
      </form>
    </div>
  );
};


export default AddProduct;