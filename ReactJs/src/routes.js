import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Main from './pages/main';
import Product from './pages/product';

const Routes = () => {
   return (
      <BrowserRouter>
         <Route path="/" component={Main} exact />
         <Route path="/products/:id" component={Product} />
      </BrowserRouter>
   )
}

export default Routes;