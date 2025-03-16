import React from 'react'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import { men_kurta } from '../../../Data/men_kurta'
import { men_jeans } from '../../../Data/men_jeans'
import { men_shirt } from '../../../Data/men_shirt'
import { women_dress } from '../../../Data/women_dress'
import { women_jeans } from '../../../Data/women_jeans'
import { women_top } from '../../../Data/women_top'
import { women_lengha_choli } from '../../../Data/women_lengha_choli'
import { women_saree } from '../../../Data/women_saree'
import { women_gouns } from '../../../Data/women_gouns'
import { women_kurtas } from '../../../Data/women_kurtas'

const HomePage = () => {
    return (
        <div>
            <MainCarousel />
            <div className='pt-10 px-5 lg:px-10 space-y-10 flex flex-col justify-center'>
                <HomeSectionCarousel data={women_lengha_choli} sectionName={"Women's Lengha Choli"} />
                <HomeSectionCarousel data={women_saree} sectionName={"Women's Saree"} />
                <HomeSectionCarousel data={women_gouns} sectionName={"Women's Gouns"} />
                <HomeSectionCarousel data={women_dress} sectionName={"Women's Dress"} />
                <HomeSectionCarousel data={women_top} sectionName={"Women's Top"} />
                <HomeSectionCarousel data={women_jeans} sectionName={"Women's Jeans"} />
                <HomeSectionCarousel data={women_kurtas} sectionName={"Women's Kurtas"} />
                <HomeSectionCarousel data={men_kurta} sectionName={"Men's Kurta"} />
                <HomeSectionCarousel data={men_shirt} sectionName={"Men's Shirt"} />
                <HomeSectionCarousel data={men_jeans} sectionName={"Men's Jeans"} />
            </div>
        </div>
    )
}

export default HomePage