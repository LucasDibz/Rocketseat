import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

const Product = () => {
   const [product, setProduct] = useState({});
   const { id } = useParams();

   useEffect(async () => {
      const response = await api.get(`/products/${id}`);

      setProduct(response.data);
   }, []);

   return (
      <div className="product-info">
         <h1>{product.title}</h1>
         <p>{product.description}</p>

         <p>
            URL: <a href={product.url}>{product.url}</a>
         </p>
      </div>
   );
}

export default Product;