import { memo, useState } from 'react';
import dynamic from 'next/dynamic';

// import { AddProductToWishlist } from './AddProductToWishlist';
import { AddProductToWishlistProps } from './AddProductToWishlist';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import('./AddProductToWishlist').then(
      (mod) => mod.AddProductToWishlist,
    );
  },
  {
    loading: () => <span>Carregando...</span>,
  },
);

type Product = {
  id: number;
  price: number;
  priceFormatted: string;
  title: string;
};

interface ProductItemProps {
  product: Product;
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  // async function showFormattedDate() {
  //   const { format } = await import('date-fns');
  //   format()
  //   ...
  // }

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

/*
 * memo
 * Should be used when:
 *  1. Pure Functional Components (Same input, always returns same values)
 *  2. Renders too often
 *  3. Re-renders with same props
 *  4. Medium to large size component
 */

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  },
);
