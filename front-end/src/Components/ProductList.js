import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`https://mern-api-zuqe.onrender.com/${userid}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteproduct = async (id) => {
    let result = await fetch(`https://mern-api-zuqe.onrender.com/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Product List</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: 'flex-start',
        }}
      >
        {products.length > 0 ? (
          products.map((item, index) => (
            <div
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                height:'auto',
                width:'150px',
              }}
              key={index}
            >
              <p>{index + 1}</p>
              <img
                alt={item.name}
                src={`http://localhost:4500/${item.image}`}
                style={{
                  height: "100%",
                  width: "100px",
                  objectFit: "cover",
                }}
              />
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.category}</p>
              <p>
                <button
                  style={{ height: "30px", background: "red", color: "white" }}
                  onClick={() => deleteproduct(item._id)}
                >
                  Delete
                </button>
              </p>
              <Link to={"/update/" + item._id}>update</Link>
            </div>
          ))
        ) : (
          <h1>No Results</h1>
        )}
      </div>
    </div>
  );
}

export default ProductList;
