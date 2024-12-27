import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [image, setImage] = useState(null); // State for the image file
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price || !category || !company || !image) {
      setError(true);
      return false;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('company', company);
    formData.append('userid', JSON.parse(localStorage.getItem('user'))._id);
    formData.append('image', image);

    const result = await fetch('http://localhost:4500/add-product', {
      method: 'POST',
      body: formData,
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
      }
    });

    const data = await result.json();
    console.log(data);
    navigate('/products');
  };
 

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <span style={{ color: 'red' }}>Enter a valid name</span>}

      <input
        type="text"
        placeholder="Enter product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && <span style={{ color: 'red' }}>Enter a valid price</span>}

      <input
        type="text"
        placeholder="Enter product category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && <span style={{ color: 'red' }}>Enter a valid category</span>}

      <input
        type="text"
        placeholder="Enter product company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && <span style={{ color: 'red' }}>Enter a valid company</span>}

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      {error && !image && <span style={{ color: 'red' }}>Upload a valid image</span>}

      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default AddProduct;
