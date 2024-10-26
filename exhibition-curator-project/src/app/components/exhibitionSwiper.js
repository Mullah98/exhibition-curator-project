'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs} from 'swiper/modules'
import Image from 'next/image'
import { IoTrashOutline } from "react-icons/io5";


import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

export default function ExhibitionSwiper({artworks, onDelete}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)

    if (!artworks.length) {
        return <p>No artworks found</p>
    }

    console.log(artworks);
    

  return (
     <section className='py-12 w-full flex justify-center items-center'>
     <div className='container mt-12'>

     <div className='flex flex-col md:flex-row'>
     <div className='relative'>
     <button className='' onClick={() => onDelete(artworks[activeIndex])}><IoTrashOutline className='text-2xl'/></button>
     </div>
     <div className='w-full md:w-3/4 pr-4'>
        <Swiper 
        style={{'--swiper-navigation-color': '#000', '--swiper-navigation-color': '#000'}}
        loop={true}
        spaceBetween={5}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='h-[600px] w-full rounded-lg'
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
            {artworks.map((art) => (
                <SwiperSlide key={art.id}>
                    <Image 
                    src={art?.primaryimageurl} 
                    alt={art?.title} 
                    fill 
                    sizes='(max-width: [768px]) 100vw, (max-width: 1200px) 50vw, 33vw' 
                    className='object-contain border-4 border-yellow-700' />
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
        <div className='w-full md:w-1/4 pl-4 flex flex-col items-center text-4xl sm:text-2xl md:text-3xl'>
        <h2 className='text-2xl sm:text-4xl whitespace-pre'>{artworks[activeIndex]?.title || 'no title found'}</h2>
            <h3 className='text-2xl sm:text-4xl text-gray-500'>{artworks[activeIndex]?.objectnumber || 'object number not found'}</h3>
            <h3 className='text-xl sm:text-2xl border-b border-gray-300 py-3'>{artworks[activeIndex]?.classification || 'classification not found'}</h3>
            <h3 className='text-xl sm:text-2xl border-gray-300 py-3'>{artworks[activeIndex]?.description || 'no description found'}</h3>
            <h3 className='text-xl sm:text-2xl border-gray-300 py-3'>{artworks[activeIndex]?.people[0].displayname || 'artist not found'}</h3>
            <h3 className='text-xl sm:text-2xl border-gray-300 py-3'>{artworks[activeIndex]?.dated || 'date not found'}</h3>
            <h3 className='text-xl sm:text-2xl border-gray-300 py-3'>{artworks[activeIndex]?.dimensions || 'dimensions not found'}</h3>
            <h3 className='text-xl sm:text-2xl border-gray-300 py-3'>{artworks[activeIndex]?.period || 'period not found'}</h3>
            <h3 className='text-xl sm:text-2xl border-gray-300 py-3'>{artworks[activeIndex]?.department || 'department not found'}</h3>
            <h3 className='text-xl sm:text-2xl border-gray-300 py-3 whitespace-pre-wrap'>
            Find out more about the artwork <span><strong><a href={artworks[activeIndex]?.url} className='cursor-pointer hover:underline' target='_blank' rel='noopener noreferrer'>here</a></strong></span></h3>

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
            {artworks.map((art, i) => (
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
