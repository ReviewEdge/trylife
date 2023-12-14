import React, { Component } from 'react';


import gotProducts from  './SAMPLEproduct.json'




export class ViewProducts extends Component {
  static displayName = ViewProducts.name;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    // this.loadProducts();
    this.setState({ products: gotProducts });
  }

  loadProducts() {
    fetch('SAMPLEproduct.json') // Assuming the JSON file is in the same directory
        .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ products: data });
      })
      .catch(error => {
        console.error('Error loading products:', error);
      });
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <h1>Products</h1>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <strong>{product.name}</strong>
              <p>Description: {product.description}</p>
              <p>Category: {product.category}</p>
              <p>
                Age Range: {product.age_range_months_start} -{' '}
                {product.age_range_months_end} months
              </p>
              <p>Points: {product.points}</p>
              <p>Training: {product.training}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
