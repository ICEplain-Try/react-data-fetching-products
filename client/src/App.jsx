import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // สร้าง State สำหรับเก็บรายการสินค้า
  const [productData, setProductData] = useState([]);

  // ฟังก์ชันดึงข้อมูลสินค้าจาก Server
  function fetchProductData() {
    async function getProductsFromServer() {
      try {
        const response = await axios.get("http://localhost:4001/products");
        const productsFromServer = response.data.data;
        setProductData(productsFromServer); // อัปเดต State
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    }
    getProductsFromServer();
  }

  // ฟังก์ชันลบสินค้าออกจาก Server
  function deleteProductById(productId) {
    async function sendDeleteRequest() {
      try {
        await axios.delete(`http://localhost:4001/products/${productId}`);
        const updatedProductList = productData.filter(function (product) {
          return product.id !== productId;
        });
        setProductData(updatedProductList);
      } catch (error) {
        console.log("Error deleting product:", error);
      }
    }
    sendDeleteRequest();
  }

  // ดึงข้อมูลสินค้าทันทีที่ Component โหลดครั้งแรก
  useEffect(function () {
    fetchProductData();
  }, []);

  // Render ส่วน UI
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productData.map(function (product) {
          return (
            <div key={product.id} className="product">
              <div className="product-preview">
                <img
                  src={product.image}
                  alt={product.name}
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>
              <button
                className="delete-button"
                onClick={function () {
                  deleteProductById(product.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
