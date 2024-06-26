import React from 'react';

const Image = ({ img, alt }) => {
    return (
        <div className='overflow-hidden w-full h-full'>
            <img src={img} className='object-cover object-center w-full h-full opacity-90 group-hover:opacity-80 group-hover:scale-110 transition duration-500' alt={alt ? alt : "no alt"} />
        </div>
    );
}

export default Image;
