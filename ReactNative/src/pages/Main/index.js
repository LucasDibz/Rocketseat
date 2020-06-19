import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import styles from './styles';

const Main = () => {
   const [products, setProducts] = useState([]);
   const [productInfo, setProductInfo] = useState({});
   const [page, setPage] = useState(1);

   const navigation = useNavigation();

   useEffect(() => {
      loadProducts(page);
   }, []);

   const loadProducts = async (page) => {
      const response = await api.get(`/products?page=${page}`);
      const { docs, ...productInfo } = response.data;

      setProducts([...products, ...docs]);
      setProductInfo(productInfo);
   }

   function navigateToProduct(product) {
      navigation.navigate('Product', { product });
   }

   const renderItem = ({ item: product }) => (
      <View style={styles.productContainer}>
         <Text style={styles.productTitle}>{product.title}</Text>
         <Text style={styles.productDescription}>{product.description}</Text>

         <TouchableOpacity
            style={styles.productButton}
            onPress={() => { navigateToProduct(product) }}
         >
            <Text style={styles.productButtonText}>Acessar</Text>
         </TouchableOpacity>
      </View>
   );

   const loadMore = () => {
      if (page === productInfo.pages) return;

      const pageNumber = page + 1;

      loadProducts(pageNumber);
      setPage(pageNumber);
   }

   return (
      <View style={styles.container}>
         <FlatList
            contentContainerStyle={styles.list}
            data={products}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
         />
      </View>
   )
}

export default Main;
