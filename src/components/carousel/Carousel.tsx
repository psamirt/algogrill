import React, { useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'

const Carousel: React.FC = () => {
  const slides = [
    { url: '/imagenes/hamburguesa.png' },
    { url: '/imagenes/alitas.png' },
    { url: '/imagenes/pack2.png' },
    { url: '/imagenes/salchigrill.png' },
    { url: '/imagenes/presentacion.png' }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = (): void => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }
  const nextSlide = (): void => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: number): void => {
    setCurrentIndex(slideIndex)
  }

  return (
    // <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
    //   {slides.map((slide, index) => (
    //     <div
    //       key={index}
    //       className={`w-full h-full rounded-2x1 bg-center bg-cover duration-500 ${index === currentIndex ? '' : 'hidden'}`}
    //     >
    //       <img src={slide.url} alt={`Slide ${index}`} className='w-full h-full' />
    //     </div>
    //   ))}
    //   {/* flecha izquierda */}
    //   <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
    //     <BsChevronCompactLeft onClick={prevSlide} size={30} />
    //   </div>
    //   {/* flecha derecha */}
    //   <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
    //     <BsChevronCompactRight onClick={nextSlide} size={30} />
    //   </div>
    //   <div className='flex top-4 justify-center py-2'>
    //     {slides.map((_slide, slideIndex) => (
    //       <div className='text-2xl cursor-pointer' key={slideIndex} onClick={(): void => { goToSlide(slideIndex) }}>
    //         <RxDotFilled />
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
      <div
      style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      className='w-full h-full rounder-2x1 bg-center bg-cover duration-500'
      >
      </div>
    {/* flecha izquierda */}
    <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
      <BsChevronCompactLeft onClick={prevSlide} size={30} />
    </div>
    {/* flecha derecha */}
    <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
      <BsChevronCompactRight onClick={nextSlide} size={30} />
    </div>
    <div className='flex top-4 justify-center py-2'>
      {slides.map((_slide, slideIndex) => (
        <div className='text-2xl cursor-pointer text-white' key={slideIndex} onClick={(): void => { goToSlide(slideIndex) }}>
          <RxDotFilled />
        </div>
      ))}
    </div>
  </div>
  )
}

export default Carousel
