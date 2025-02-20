import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface SubscriptionRevenueChartProps {
  data: { date: Date; salePerDays: number }[];
}

const SubscriptionRevenueChart: React.FC<SubscriptionRevenueChartProps> = ({ data }) => {
  const formatYAxis = (value: number) => `$${value}`;
  const formatTooltip = (value: number) => [`$${value}`, "Sale per days"];
  const formatXAxis = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`; // Format as day/month
  };

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const chartData = data.map(item => ({
    ...item,
    date: item.date.toISOString(), // Convert Date to string for Recharts
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatXAxis}
          interval={0} // Show all ticks
          angle={-45} // Rotate labels for better readability
          textAnchor="end" // Align rotated text
          height={60} // Increase height to accommodate rotated labels
        />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip formatter={formatTooltip} labelFormatter={formatXAxis} />
        <Legend />
        <Line type="monotone" dataKey="salePerDays" name="Sale per days" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SubscriptionRevenueChart;