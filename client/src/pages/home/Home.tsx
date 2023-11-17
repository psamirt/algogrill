import CardHome from '../../components/card/CardHome'
import Carousel from '../../components/carousel/Carousel'
import { motion } from 'framer-motion'

const Home = (): JSX.Element => {
	return (
		<motion.div
			className='max-w-[1400px] bg-slate-50 m-auto h-[88vh]'
			initial={{
				opacity: 0,
				translateX: 90,
			}}
			animate={{ opacity: 1, translateX: 0, translateY: 0 }}
			transition={{ duration: 1.2, delay: 0.3 }}
		>
			<Carousel></Carousel>
			<CardHome />
		</motion.div>
	)
}

export default Home
