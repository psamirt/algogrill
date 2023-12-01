import Order from '../database/models/order.js';

export const getPayed = async (_req, res) => {
  try {
    const totalPaid = await Order.aggregate([
      {
        $match: {
          status: 'payed'
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$total_amount' }
        }
      }
    ]);

    res.status(200).json({ totalPaid: totalPaid[0]?.totalAmount || 0 });
  } catch (error) {
    console.error('Error calculating total paid amount:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTopSellingProducts = async (_req, res) => {
  try {
    const topSellingProducts = await Order.aggregate([
      {
        $unwind: '$paymentInfo.additional_info.items'
      },
      {
        $group: {
          _id: '$paymentInfo.additional_info.items.id',
          productName: { $first: '$paymentInfo.additional_info.items.title' },
          totalSold: { $sum: { $toInt: '$paymentInfo.additional_info.items.quantity' } }
        }
      },
      {
        $sort: { totalSold: -1 }
      },
    ]);

    const totalProductsSold = topSellingProducts.reduce((acc, product) => acc + product.totalSold, 0);

    res.status(200).json({ topSellingProducts, totalProductsSold });
  } catch (error) {
    console.error('Error getting top selling products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getSalesByDay = async (_req, res) => {
  try {
    const salesByDay = await Order.aggregate([
      {
        $group: {
          _id: {
            day: { $dayOfMonth: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          totalSales: { $sum: '$total_amount' }
        }
      }
    ]);

    res.status(200).json({ salesByDay });
  } catch (error) {
    console.error('Error getting sales by day:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
