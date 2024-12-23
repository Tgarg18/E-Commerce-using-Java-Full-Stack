import React from 'react'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import { men_kurta } from '../../../Data/men_kurta'

const HomePage = () => {
    return (
        <div>
            <MainCarousel />
            <div className='pt-10 px-5 lg:px-10 space-y-10 flex flex-col justify-center'>
                <HomeSectionCarousel data={men_kurta} sectionName={"Men's Kurta"} />
                <HomeSectionCarousel data={men_kurta} sectionName={"Men's Shoes"} />
                <HomeSectionCarousel data={men_kurta} sectionName={"Men's Shirt"} />
                <HomeSectionCarousel data={men_kurta} sectionName={"Women's Saree"} />
                <HomeSectionCarousel data={men_kurta} sectionName={"Women's Dress"} />
            </div>
        </div>
    )
}

export default HomePage