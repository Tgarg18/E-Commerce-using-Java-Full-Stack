import React, { useEffect, useState } from 'react'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import { useSelector, useDispatch } from 'react-redux';
import { fetchHomePageData } from '../../../State/HomePageProductData/Action';

const HomePage = () => {

  const dispath = useDispatch();

  const { homePageData } = useSelector(store => store);

  useEffect(() => {
    dispath(fetchHomePageData());
  }, []);

  return (
    <div>
      <MainCarousel />
      <div className='pt-10 px-5 lg:px-10 space-y-10 flex flex-col justify-center'>
        {
          (homePageData?.data && Object.keys(homePageData?.data).length > 0) ?
            <div className='flex flex-col space-y-10'>
              {Object.keys(homePageData?.data)?.map((key, index) => (
                <HomeSectionCarousel key={index} data={homePageData?.data[key]} sectionName={key} />
              ))}
            </div>
            :
            <div className='flex justify-center items-center h-screen'>
              <h1 className='text-2xl font-bold'>Loading...</h1>
            </div>
        }
      </div>
    </div>
  )
}

export default HomePage;