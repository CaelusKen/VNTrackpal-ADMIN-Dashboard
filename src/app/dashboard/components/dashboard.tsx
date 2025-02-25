"use client";

import React, { useMemo } from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { ChartData } from "@/types/chartdata";
import { generateRandomData } from "@/utils/dataGeneration";
import VietnamUserMap from "./user-distribution-map/user-distribution-map";
import SubscriptionRevenueChart from "./subscription-revenue-chart/subscription-revenue-chart";

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
  const subscriptionsThisMonth = chartData.reduce(
    (sum, data) => sum + data.premiumUsers,
    0
  );
  const currentFoodCount = 0; // Placeholder for actual food count
  const revenue = subscriptionsThisMonth * 20; // $20 per subscription

  const userDistribution = useMemo(
    () => ({
      "Ha Noi": 1000,
      "Ho Chi Minh": 1500,
      "Da Nang": 500,
      // Add more cities/regions as needed
    }),
    []
  );

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
        <div className="w-full bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            User Distribution in Vietnam
          </h2>
          <VietnamUserMap userDistribution={userDistribution} />
        </div>
        <div className="w-full lg:flex-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Daily Subscription Revenue
          </h2>
          <SubscriptionRevenueChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
