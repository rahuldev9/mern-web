import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [image, setImage] = useState(null); // New state for the image file
    const [currentImage, setCurrentImage] = useState(''); // To display the existing image
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        let result = await fetch(`https://mern-api-zuqe.onrender.com/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
        setCurrentImage(result.image); // Set the existing image path
    };

    const updateProduct = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('company', company);
        if (image) {
            formData.append('image', image); // Append new image if uploaded
        }

        let result = await fetch(`https://mern-api-zuqe.onrender.com//product/${params.id}`, {
            method: 'PUT',
            body: formData,
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        });
        result = await result.json();
        console.warn(result);
        navigate('/products');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>Update Product</h2>
            <input
                value={name}
                type="text"
                placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                value={price}
                type="text"
                placeholder="Enter product price"
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                value={category}
                type="text"
                placeholder="Enter product category"
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                value={company}
                type="text"
                placeholder="Enter product company"
                onChange={(e) => setCompany(e.target.value)}
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])} // Update image state
            />
            {currentImage && (
                <img
                    src={`https://mern-api-zuqe.onrender.com/${currentImage}`}
                    alt="Current product"
                    style={{ width: '250px', height: '250px', marginTop: '10px'}}
                />
            )}
            <button onClick={updateProduct}>Update Product</button>
        </div>
    );
}

export default UpdateProduct;
