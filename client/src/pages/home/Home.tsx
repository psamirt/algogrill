import CardHome from '../../components/card/CardHome'
import Carousel from '../../components/carousel/Carousel'
const Home = (): JSX.Element => {
	return (
		<div className='max-w-[1400px] bg-slate-50 m-auto h-[88vh]'>
			<Carousel></Carousel>
			<CardHome />
		</div>
	)
}

export default Home
