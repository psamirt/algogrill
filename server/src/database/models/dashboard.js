import { Schema, model } from 'mongoose';

const dashboardSchema = new Schema(
  {
    salesForMonth:{
        type:Number,
    },
    salesForWeek:{
        type:Number
    },
    salesForDay:{
        type:Number
    },
    productsForMonth:{
        type:Number,
    },
    productsForWeek:{
        type:Number
    },
    productsForDay:{
        type:Number
    },
    metaForMonth:{
        type:Number,
    },
    metaForWeek:{
        type:Number
    },
    metaForDay:{
        type:Number
    },
  },
  {
    timestamps: true,
    collection: 'dashboard'
  }
);

const Dashboard = model('Dashboard', dashboardSchema);
export default Dashboard;
