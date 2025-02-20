"use client"

import React, { useMemo } from 'react';
import { DashboardCard } from '@/components/ui/dashboard-card';
import { ChartData } from '@/types/chartdata';
import { generateRandomData } from '@/utils/dataGeneration';
import VietnamUserMap from './VietnamUserMap'; // You'll need to create this component
import SubscriptionRevenueChart from './SubscriptionRevenueChart'; // You'll need to create this component

const Dashboard: React.FC = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed

  const chartData: ChartData[] = useMemo(() => {
    return generateRandomData(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  const totalUsers = useMemo(() => {
    return chartData.reduce((sum, data) => sum + data.activeUsers, 0);
  }, [chartData]);
  const subscriptionsThisMonth = chartData.reduce((sum, data) => sum + data.premiumUsers, 0);
  const currentFoodCount = 0; // Placeholder for actual food count
  const revenue = subscriptionsThisMonth * 20; // $20 per subscription
  const dailySubscriptionRevenue = useMemo(() => {
    return chartData.map(data => ({
      date: data.date,
      salePerDays: data.premiumUsers * 20 // $20 per subscription
    }));
  }, [chartData]);

  const userDistribution = useMemo(() => ({
    'Ha Noi': 1000,
    'Ho Chi Minh': 1500,
    'Da Nang': 500,
    // Add more cities/regions as needed
  }), []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard headerTitle="Total Users">
          <div className="text-2xl font-bold">{totalUsers}</div>
        </DashboardCard>
        <DashboardCard headerTitle="Subscriptions This Month">
          <div className="text-2xl font-bold">{subscriptionsThisMonth}</div>
        </DashboardCard>
        <DashboardCard headerTitle="Current Food In Database">
          <div className="text-2xl font-bold">{currentFoodCount}</div>
        </DashboardCard>
        <DashboardCard headerTitle="Revenue">
          <div className="text-2xl font-bold">${revenue}</div>
        </DashboardCard>
      </div>
      {/* New section for geolocation map and subscription revenue chart */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Distribution in Vietnam</h2>
          <VietnamUserMap userDistribution={userDistribution} />
        </div>
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Daily Subscription Revenue</h2>
          <SubscriptionRevenueChart data={dailySubscriptionRevenue} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;