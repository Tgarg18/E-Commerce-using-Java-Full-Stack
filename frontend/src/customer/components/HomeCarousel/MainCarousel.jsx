import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { CarouselData } from './CarouselData';

const items = CarouselData.map((item) => {
    return <img className='cursor-pointer -z-10' draggable={false} src={item.image} role='presentation' alt='' />
});

const MainCarousel = () => (
    <AliceCarousel
        mouseTracking
        items={items}
        autoPlay={true}
        autoPlayInterval={5000}
        autoPlayStrategy='none'
        disableButtonsControls
        infinite
    />
);

export default MainCarousel;