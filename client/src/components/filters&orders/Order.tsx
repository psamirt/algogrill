import React from 'react';

interface OrderOptions {
  label: string;
  value: string;
}

interface OrderProps {
  onOrderChange: (value: string) => void;
  orderOptions: OrderOptions[];
}

const Order: React.FC<OrderProps> = ({ onOrderChange, orderOptions }) => {
  return (
    <div>
      <select onChange={(e) => onOrderChange(e.target.value)} className='rounded p-1 cursor-pointer font-semibold'>
        {orderOptions.map((option) => (
          <option key={option.value} value={option.value} className='font-semibold'>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Order;
