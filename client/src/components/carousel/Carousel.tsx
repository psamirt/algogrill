import { useEffect, useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'
import { slides } from '../../utils/Types'

const Carousel: React.FC = () => {

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

	useEffect(()=> {
		const interval = setInterval(()=> {
			const newIndex = (currentIndex +1) % slides.length
			setCurrentIndex(newIndex)
		}, 5000)
		return ()=> clearInterval(interval)
	},[currentIndex, slides.length])

	return (
		<div className='max-w-[1400px] h-[450px] w-full mx-auto py-0 px-4 relative group '>
			<div
				style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
				className='h-full bg-center bg-cover duration-500'
			></div>
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
					<div
						className='text-2xl cursor-pointer'
						key={slideIndex}
						onClick={(): void => {
							goToSlide(slideIndex)
						}}
					>
						<RxDotFilled />
					</div>
				))}
			</div>
		</div>
	)
}

export default Carousel
