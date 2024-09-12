import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import DropdownMenu from './DropdownMenu.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../../../features/productSlice.js';
import MetaData from '../../layout/MetaData.jsx';
import { getallOrders, clearErrors, deleteOrder, deleteOrderReset, updateOrderReset } from '../../../features/orderSlice';
import { getAllUsers } from '../../../features/useManagementSlice.js';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// Helper function to aggregate orders by month
const getMonthlyOrders = (orders) => {
  const monthlyOrders = Array(12).fill(0); // 12 months

  orders.forEach(order => {
    const date = new Date(order.createdAt.$date || order.createdAt); // Convert to date
    const month = date.getMonth(); // Get the month (0-11)
    monthlyOrders[month] += 1; // Increment the count for that month
  });

  return monthlyOrders;
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.raw}`,
      },
    },
  },
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw}`,
      },
    },
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.userManagement);
  
  const [barData, setBarData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly Orders',
        data: Array(12).fill(0), // Start with 0 for each month
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getallOrders());
    dispatch(getAllUsers());

    if (orders) {
      const monthlyOrders = getMonthlyOrders(orders);

      setBarData({
        ...barData,
        datasets: [
          {
            ...barData.datasets[0],
            data: monthlyOrders, // Update the chart data with the orders count for each month
          },
        ],
      });
    }
  }, [dispatch, orders]);

  let totalAmount = 0;
  orders && orders.forEach((item) => {
    totalAmount += item.totalPrice;
  });

  let outOfStock = 0;
  let inStock = 0;

  products && products.forEach((item) => {
    if (item.stock === 0) {
      outOfStock += 1;
    } else {
      inStock += 1;
    }
  });

  const doughnutData = {
    labels: ['In Stock', 'Out of Stock'],
    datasets: [
      {
        label: 'Product Stock',
        data: [inStock, outOfStock],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <>
      <MetaData title={"DashBoard"} />
      <div className="p-6 lg:p-8 mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <DropdownMenu />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
            <h4 className="text-lg font-semibold mb-2">Total Users</h4>
            <p className="text-3xl font-bold text-gray-800">{users.length}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
            <h4 className="text-lg font-semibold mb-2">Total Products</h4>
            <p className="text-3xl font-bold text-gray-800">{products.length}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
            <h4 className="text-lg font-semibold mb-2">Total Orders</h4>
            <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
            <h4 className="text-lg font-semibold mb-2">Total Revenue</h4>
            <p className="text-3xl font-bold text-gray-800">{totalAmount}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
            <h4 className="text-lg font-semibold mb-4">Monthly Orders Overview</h4>
            <div className="w-full h-64">
              <Bar data={barData} options={options} />
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4 m-auto w-[100%]">
            <h4 className="text-lg font-semibold mb-4">Product Stock Overview</h4>
            <div className="w-full h-64">
              <Doughnut data={doughnutData} options={doughnutOptions} className="m-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
