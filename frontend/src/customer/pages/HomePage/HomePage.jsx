import React from 'react'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import { men_kurta } from '../../../Data/men_kurta'

const HomePage = () => {
    return (
        <div>
            <MainCarousel />
            <div className='py-20 px-5 lg:px-10 space-y-10 flex flex-col justify-center'>
                <HomeSectionCarousel data={men_kurta} sectionName={"Men's Kurta"}/>
            </div>
        </div>
    )
}

export default HomePage