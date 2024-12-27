import React, { useState, useEffect } from 'react';


function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('https://mern-api-zuqe.onrender.com/home', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    };

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`https://mern-api-zuqe.onrender.com/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });

            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px'}}>
            <h1>Welcome</h1>
            <input
                type="text"
                placeholder="Search product"
                style={{ height: '30px', width: '70%' }}
                onChange={searchHandle}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent:'flex-start',
                }}
            >
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <div
                            style={{
                                border: '1px solid #ccc',
                                margin: '10px',
                                padding: '10px',
                                textAlign: 'center',
                                height:'auto',
                                width:'100px',
                            }}
                            key={index}
                        >
                            <p>{index + 1}</p>
                            <img
                                alt={item.name}
                                src={`https://mern-api-zuqe.onrender.com/${item.image}`}
                                style={{
                                    height: '100px',
                                    width: '100px',
                                    objectFit: 'cover',
                                }}
                            />
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{item.category}</p>
                        </div>
                    ))
                ) : (
                    <h1>No Results</h1>
                )}
            </div>
        </div>
    );
}

export default Home;
