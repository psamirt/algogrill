import Card from '../../components/card/Card'
import Carousel from '../../components/carousel/Carousel'
const Home = (): JSX.Element => {
	return (
		<div className='max-w-[1400px] m-auto'>
			<Carousel></Carousel>
		<Card/>
		</div>
	)
}

export default Home
