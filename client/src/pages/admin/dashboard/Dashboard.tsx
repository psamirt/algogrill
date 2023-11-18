import React from 'react'
import {
	BadgeDelta,
	Card,
	Flex,
	Metric,
	ProgressBar,
	Text,
} from '@tremor/react'
import { motion } from 'framer-motion'

const Dashboard: React.FC = () => {
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
			<Card className='max-w-lg mx-auto'>
				<Flex alignItems='start'>
					<div>
						<Text>Ventas</Text>
						<Metric>./S 12,699</Metric>
					</div>
					<BadgeDelta deltaType='moderateIncrease'>13.2%</BadgeDelta>
				</Flex>
				<Flex className='mt-4'>
					<Text className='truncate'>68% ($ 149,940)</Text>
					<Text>$ 220,500</Text>
				</Flex>
				<ProgressBar value={15.9} className='mt-2' />
			</Card>
		</motion.div>
	)
}

export default Dashboard
