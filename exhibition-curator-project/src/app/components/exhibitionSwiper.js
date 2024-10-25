// import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function ExhibitionSwiper({artworks}) {
    if (!artworks.length) {
        return <p>No artworks found</p>
    }
  return (
    <section>
        <div className='container'>
            <Swiper navigation pagination={{type: 'fraction'}} modules={[Navigation, Pagination]} className='h-96 w-full rounded-lg'>
                {artworks?.map((artwork, i) => (
                    <SwiperSlide key={i}>
                        <div className='relative flex h-full w-full items-center justify-center'>
                        <Image
                        src={artwork.primaryimageurl}
                        alt={`Image for ${artwork.id}`}
                        fill
                        sizes="(max-width: [768px]) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                        priority />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </section>
  )
}
