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

export const getTotalProductsSold = async (_req, res) => {
  try {
    const totalProductsSold = await Order.aggregate([
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: null,
          totalProductsSold: { $sum: '$items.quantity' }
        }
      }
    ]);

    res
      .status(200)
      .json({
        totalProductsSold: totalProductsSold[0]?.totalProductsSold || 0
      });
  } catch (error) {
    console.error('Error calculating total products sold:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTopSellingProducts = async (_req, res) => {
  try {
    const topSellingProducts = await Order.aggregate([
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: '$items._id',
          productName: { $first: '$items.product.title' },
          totalSold: { $sum: '$items.quantity' }
        }
      },
      {
        $sort: { totalSold: -1 }
      },
      {
        $limit: 10 // Obtén los 10 productos más vendidos, ajusta según sea necesario
      }
    ]);

    res.status(200).json({ topSellingProducts });
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
          _id: { $dayOfMonth: '$createdAt' },
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
