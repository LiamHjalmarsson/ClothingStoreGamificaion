import React from 'react';
import { useRootContext } from '../Root';
import ProductsContainer from '../../components/product/Products';

const Products = () => {
    let { products } = useRootContext();

    return (
        <section className='max-lg:pt-24 pt-12 px-6'>
            <ProductsContainer products={products} />
        </section>
    );
}

export default Products;
