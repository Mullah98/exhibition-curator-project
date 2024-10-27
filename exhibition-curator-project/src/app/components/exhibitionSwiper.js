'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs} from 'swiper/modules'
import Image from 'next/image'
import { IoTrashOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

export default function ExhibitionSwiper({artworks, onDelete, darkMode}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)

    if (!artworks || artworks.length === 0) {
        return <div className='flex items-center justify-center mt-32'>
        <div className='text-center p-6 border border-gray-300 rounded-lg shadow-lg'>
            <h2 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">
                No Artworks Selected
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-4">
                You have not selected any artworks. Please go back to the artworks page and select your desired artworks.
            </p>
            <div className='flex justify-center'>
            <MdErrorOutline className='text-red-500 text-5xl' />
            </div>
        </div>
        </div>
    }    

  return (
     <section className={`w-full flex justify-center items-center py-5 ${darkMode ? 'ambient-light-effect' : ''}`}>
     <div className='container mt-10 shadow-lg rounded-lg'>
     <div className='flex flex-col md:flex-row'>

     <div className='w-full md:w-3/4 pr-4'>
        <Swiper 
        style={{'--swiper-navigation-color': '#000', '--swiper-navigation-color': '#000'}}
        loop={true}
        spaceBetween={5}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='h-[600px] w-full rounded-lg  gold-frame'
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
        {artworks?.map((art) => (
            <SwiperSlide key={art.id}>
                <Image 
                src={art?.primaryimageurl} 
                alt={art?.title} 
                fill 
                sizes='(max-width: [768px]) 100vw, (max-width: 1200px) 50vw, 33vw' 
                className='object-contain' />
            </SwiperSlide>
        ))}
        </Swiper>
        </div>
        <div className='w-full md:w-1/4 pl-4 flex flex-col items-center text-4xl sm:text-2xl md:text-2xl text-center'>
            <button className='mt-2 sm:mb-2 p-2 hover:bg-red-500 hover:text-white hover:rounded-lg border border-transparent transition-all duration-300'
            onClick={() => onDelete(artworks[activeIndex])}>
            <IoTrashOutline className='text-2xl'/>
            </button>
            <h2 className='text-2xl sm:text-3xl text-center'>{artworks[activeIndex]?.title || 'no title found'}</h2>
            <h3 className='text-2xl sm:text-3xl text-gray-500'>{artworks[activeIndex]?.objectnumber || 'object number not found'}</h3>
            {artworks[activeIndex]?.classification && 
            <h3 className='text-xl sm:text-2xl border-b border-gray-300 border-gray-300 py-2'>
            {artworks[activeIndex].classification}
            </h3>}
            {artworks[activeIndex]?.description &&
            <h3 className='text-xl sm:text-2xl border-b border-gray-300 border-gray-300 py-2'>
            {artworks[activeIndex].description}
            </h3>}
            {artworks[activeIndex]?.peoplecount !== 0 &&
            <h3 className='text-xl sm:text-2xl border-b border-gray-300 border-gray-300 py-2'>
            {artworks[activeIndex].people[0].displayname}
            </h3>}
            {artworks[activeIndex]?.dated &&
            <h3 className='text-xl sm:text-2xl border-b border-gray-300 border-gray-300 py-2'>
            {artworks[activeIndex].dated}
            </h3>}
            {artworks[activeIndex]?.dimensions &&
            <h3 className='text-lg sm:text-xl border-b border-gray-300 border-gray-300 py-2'>
            {artworks[activeIndex].dimensions}
            </h3>}
            {artworks[activeIndex]?.period &&
            <h3 className='text-xl sm:text-2xl border-b border-gray-300 border-gray-300 py-2'>
            {artworks[activeIndex].period}
            </h3>}
            {artworks[activeIndex]?.department &&
            <h3 className='text-xl sm:text-2xl border-b border-gray-300 border-gray-300 py-2'>
            {artworks[activeIndex].department}
            </h3>}
            {artworks[activeIndex]?.url && 
            <h3 className='text-lg sm:text-xl text-center border-b border-gray-300 border-gray-300 py-2 whitespace-pre-wrap'>
            Find out more about the artwork
            <span>
             <strong>
              <a href={artworks[activeIndex]?.url} className='cursor-pointer hover:underline' target='_blank' rel='noopener noreferrer'> here</a>
             </strong>
            </span>
            </h3>}
        </div>
        </div>
        
        <Swiper 
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={4}
        slidesPerView={artworks.length}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='thumbs mt-3 h-32 w-full rounded-lg flex items-center justify-center'>
        {artworks?.map((art, i) => (
            <SwiperSlide 
            key={art.id} 
            className={`flex items-center justify-center ${i === activeIndex ? 'border-4 border-blue-200 rounded-md' : ''}`}>
                <button className='flex h-full w-full items-center justify-center'>
                    <Image 
                    src={art?.primaryimageurl} 
                    alt={art.title} 
                    fill 
                    sizes='(max-width: [768px]) 100vw, (max-width: 1200px) 50vw, 33vw' 
                    className='object-cover' />
                </button>
            </SwiperSlide>
        ))}
        </Swiper>
        </div>
     </section>
  )
}
