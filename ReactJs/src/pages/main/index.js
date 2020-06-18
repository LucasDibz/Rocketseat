import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

const Main = () => {
   const [products, setProducts] = useState([]);
   const [page, setPage] = useState(1);
   const [productInfo, setProductInfo] = useState();

   useEffect(() => {
      loadProducts(page);
   }, [page]);

   async function loadProducts(page) {
      const response = await api.get(`/products?page=${page}`);
      const { docs, ...productInfo } = response.data;

      setProducts(docs);
      setProductInfo(productInfo);
   }

   function prevPage() {
      if (page === 1) return;

      const pageNumber = page - 1;
      loadProducts(pageNumber);
      setPage(pageNumber);
   }

   function nextPage() {
      if (page === productInfo.pages) return;

      const pageNumber = page + 1;
      loadProducts(pageNumber);
      setPage(pageNumber);
   }

   return (
      <div className="product-list">
         {products.map(product => (
            <article key={product._id}>
               <strong>{product.title}</strong>
               <p>{product.description}</p>

               <Link to={`/products/${product._id}`} > Acessar</Link>
            </article>
         ))}
         <div className="actions">
            <button disabled={page === 1} onClick={prevPage}>Anterior</button>
            <button disabled={productInfo ? page === productInfo.pages : false} onClick={nextPage}>Próximo</button>
         </div>
      </div>
   )

}

export default Main;