import React from 'react';

const BurgerLine = ({custom}) => {
    return (
        <span className={`block dark:bg-rose-500 h-1 top-0 w-8 mb-1 rounded-full transition-transform duration-300 absolute ${custom}`}></span>
    );
}

export default BurgerLine;
