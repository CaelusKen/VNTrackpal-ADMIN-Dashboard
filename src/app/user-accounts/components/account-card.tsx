"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserTable from "./user-table";
import UserMetricsChart from "./metrics-chart";
import { generateRandomData } from "@/utils/dataGeneration";
import { processChartData } from "@/utils/dataProcessing";
import type { User } from "@/types/user";
import type { ChartData, WeeklyData, MonthlyData } from "@/types/chartdata"; // Add this import

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    subscription: "free",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "active",
    subscription: "premium",
  },
  // Add more mock users as needed
];

const UserAccountsCard: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [chartView, setChartView] = useState<"day" | "week" | "month">("day");

  const dailyData = useMemo(() => generateRandomData(2025, 2), []);
  const { chartData, totalActiveUsers } = useMemo(
    () => processChartData(dailyData, chartView),
    [dailyData, chartView]
  );

  const handleAddUser = () => {
    console.log("Add user");
  };

  const handleDisableUser = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleExportCSV = () => {
    console.log("Export CSV");
  };

  return (
    <main className="w-full">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">User Accounts Management</h2>
          <div className="flex space-x-2">
            <Button onClick={handleAddUser}>Add User</Button>
            <Button onClick={handleExportCSV}>Export CSV</Button>
          </div>
        </div>

        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <UserTable
          users={users}
          searchTerm={searchTerm}
          onDisableUser={handleDisableUser}
        />

        <UserMetricsChart
          chartData={chartData as (ChartData | WeeklyData | MonthlyData)[]}
          chartView={chartView}
          onChartViewChange={setChartView}
        />

        <div className="text-sm text-gray-500">
          Total Active Users monthly: {totalActiveUsers}
        </div>
      </div>
    </main>
  );
};

export default UserAccountsCard;
