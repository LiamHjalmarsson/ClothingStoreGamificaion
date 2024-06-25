import React from 'react';
import { useRootContext } from '../Root';
import ProductCard from '../../components/product/ProductCard';

const Products = () => {
    let { products } = useRootContext();

    return (
        <section className='pt-24'>
            <div className={`grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 xl:gap-12 grid justify-center items-center p-6 xl:p-12 overflow-hidden`}>
                {products.map((product, index) => (
                    <ProductCard product={product} index={index} />
                ))}
            </div>
        </section>
    );
}

export default Products;
