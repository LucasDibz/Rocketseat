import React from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';

const Product = () => {
   const navigation = useNavigation();
   const route = useRoute();

   const { product } = route.params;

   return (
      <WebView source={{ uri: product.url }} />
   );
}

export default Product;