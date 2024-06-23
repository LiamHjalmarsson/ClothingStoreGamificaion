import React from 'react';
import HeroItem from './HeroItem';

const Hero = ({ men, woman }) => {
    return (
        <div className="relative h-[70vh] 2xl:h-[90vh]">
            <div className='w-full h-full absolute top-0 left-0 flex'>
                <HeroItem genderType={men} />
                <HeroItem genderType={woman} />
            </div>
        </div>
    );
}

export default Hero;