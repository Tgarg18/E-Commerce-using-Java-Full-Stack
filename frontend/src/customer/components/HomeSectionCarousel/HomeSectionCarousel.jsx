import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button } from '@mui/material';

const HomeSectionCarousel = ({data,sectionName}) => {
    const responsive = {
        0: { items: 1.75 },
        720: { items: 3.25 },
        1024: { items: 5.5 },
    };

    const [activeIndex, setActiveIndex] = useState(0);
    const handlePrev = () => setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    const handleNext = () => setActiveIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 1));

    const onSlideChange = ({ item }) => setActiveIndex(item);
    const items = data.slice(0, 10).map((item, index) => <HomeSectionCard product={item} key={index} />);
    return (
        <div className=''>
            <h2 className='text-2xl font-extrabold text-gray-800 py-5'>{sectionName}</h2>
            <div className='relative p-5 rounded'>
                <AliceCarousel
                    mouseTracking
                    disableButtonsControls
                    disableDotsControls
                    items={items}
                    responsive={responsive}
                    activeIndex={activeIndex}
                    onSlideChanged={onSlideChange}
                />
                {activeIndex < items.length - 5 && <Button variant='contained' className='z-50' sx={{ position: 'absolute', top: '8rem', right: '0rem', transform: 'translateX(50%) rotate(90deg)', bgcolor: "black", ":hover": { bgcolor: "rgb(54, 69, 79)" } }} aria-label='next' onClick={handleNext}>
                    <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)" }} />
                </Button>}
                {activeIndex !== 0 && <Button variant='contained' className='z-50' sx={{ position: 'absolute', top: '8rem', left: '0rem', transform: 'translateX(-50%) rotate(90deg)', bgcolor: "black", ":hover": { bgcolor: "rgb(54, 69, 79)" } }} aria-label='next' onClick={handlePrev}>
                    <KeyboardArrowRightIcon sx={{ transform: "rotate(90deg)" }} />
                </Button>}
            </div>
        </div>
    )
}

export default HomeSectionCarousel