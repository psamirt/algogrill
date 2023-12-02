import React, { useEffect, useState } from 'react'
import {
	BadgeDelta,
	Card,
	Flex,
	Metric,
	ProgressBar,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
	Text,
	Title,
	Bold,
	BarList,
	Grid,
	Col,
	Subtitle,
	BarChart,
} from '@tremor/react'
import { motion } from 'framer-motion'
import {
	getPayed,
	getTopProducts,
	getSalesByDay
} from '../../../app/redux/actions/adminAction'
import { Bar, ChartDataItem } from 'utils/Types'

const Dashboard: React.FC = () => {
	const [payedData, setPayedData] = useState<number | undefined>(undefined)
	const [topProducts, setTopProducts] = useState<Bar[]>([])
	const [salesByDay, setSalesByDay] = useState<ChartDataItem[]>([])	

	useEffect(() => {
		const getTotalPayed = async () => {
			try {
				const data = await getPayed()
				setPayedData(data.totalPaid)
			} catch (error) {
				console.error('Error al obtener los pagos:', error)
			}
		}
		getTotalPayed()
	}, [])

	useEffect(() => {
		const getProducts = async () => {
			try {
				const data = await getTopProducts()
				setTopProducts(data)
			} catch (error) {
				console.error('Error al obtener el top', error)
			}
		}
		getProducts()
	}, [])

	useEffect(() => {
		const getSales = async () => {
			try {
				const data = await getSalesByDay()
				setSalesByDay(data)
			} catch (error) {
				console.error('Error al obtener el top', error)
			}
		}
		getSales()
	}, [])

	return (
		<motion.div
			className='max-w-[1400px] mx-auto flex justify-between items-center p-4'
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: 0.8,
				delay: 0.5,
				ease: [0, 0.71, 0.2, 1.01],
			}}
		>
			<TabGroup>
				<TabList className='mt-8'>
					<Tab>Objetivos</Tab>
				</TabList>
				<TabPanels>
					<TabPanel className='flex-wrap'>
						<Grid numItems={1} numItemsLg={2} className='gap-2'>
							<Col numColSpan={1} numColSpanLg={2}>
								<Card>
									<Flex alignItems='start'>
										<div>
											<Text>Ventas</Text>
											<Metric>./S {payedData}</Metric>
										</div>
										<BadgeDelta deltaType='moderateIncrease'>13.2%</BadgeDelta>
									</Flex>
									<Flex className='mt-4'>
										<Text className='truncate'>68% ($ 149,940)</Text>
										<Text>$ 220,500</Text>
									</Flex>
									<ProgressBar value={15.9} className='mt-2' />
								</Card>
							</Col>
							<Card>
								<Title>Total de ventas de los Últimos 7 días</Title>
								<Subtitle>
									Se muestran las ventas aprobadas por el sistema de
									Mercadopago, las ventas canceladas no están dentro del cuadro
								</Subtitle>
								<BarChart
									className='mt-6'
									data={salesByDay}
									index='name'
									categories={['Ranking por día']}
									colors={['red']}
									yAxisWidth={48}
								/>
							</Card>
							<Card>
								<Title>Productos más vendidos</Title>
								<Flex className='mt-4'>
									<Text>
										<Bold>Items</Bold>
									</Text>
									<Text>
										<Bold>Cantidad</Bold>
									</Text>
								</Flex>
								<BarList data={topProducts} className='mt-2' />
							</Card>
						</Grid>
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</motion.div>
	)
}

export default Dashboard
