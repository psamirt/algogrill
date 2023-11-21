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
	DonutChart,
	Title,
} from '@tremor/react'
import { motion } from 'framer-motion'
import { getPayed } from '../../../app/redux/actions/adminAction'

const cities = [
	{
		name: 'New York',
		sales: 9800,
	},
	// ...
	{
		name: 'Zurich',
		sales: 1398,
	},
]

// const valueFormatter = (number: number) =>
// 	`$ ${new Intl.NumberFormat('us').format(number).toString()}`

const Dashboard: React.FC = () => {
	const [payedData, setPayedData] = useState<number | undefined>(undefined)
	const [value, setValue] = React.useState(null)

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
					<Tab>Objetivo Diario</Tab>
					<Tab>Objetivo Mensual</Tab>
				</TabList>

				<TabPanels>
					<TabPanel className='flex-wrap'>
						<div className='flex'>
							<Card className='max-w-md m-3'>
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
							<Card className='max-w-md m-3'>
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
						</div>
						{/* ranking de productos */}
						<Card className='mx-auto'>
							<Title>Top Productos</Title>
							<DonutChart
								className='mt-6'
								data={cities}
								category='sales'
								index='name'
								colors={[
									'rose',
									'yellow',
									'orange',
									'indigo',
									'blue',
									'emerald',
								]}
								onValueChange={v => setValue(v)}
							/>
						</Card>
						<pre>{JSON.stringify(value)}</pre>
					</TabPanel>
					<TabPanel>
						<div>asd</div>
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</motion.div>
	)
}

export default Dashboard
