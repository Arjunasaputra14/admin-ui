// src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import CardBalance from "../components/fragments/CardBalance";
import CardGoal from "../components/fragments/CardGoal";
import CardUpcomingBil from "../components/fragments/CardUpcomingBil";
import CardRecentTransaction from "../components/fragments/CardRecentTransaction";
import CardStatistic from "../components/fragments/CardStatistic";
import CardExpenseBeakdown from "../components/fragments/CardExpenseBeakdown";


import {
  transactions,
  bills,
  expensesBreakdowns,
  balances,
  expensesStatistics,
} from "../data";

import { goalService } from "../services/dataService";
import { AuthContext } from "../context/authContext";
import AppSnackbar from "../components/elements/AppSnackbar";

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const { logout } = useContext(AuthContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "succes"
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({...prev, open: false}));
  };

  const fetchGoals = async () => {
    try {
      const response = await goalService();
      setGoals(response);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Gagal mengambil data goals:",
        severity: "eror",
      });
      

      // biasanya axios: err.response.status
      if (err?.response?.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  console.log("Goals:", goals);

  return (
    <MainLayout>
      <div className="grid sm:grid-cols-12 gap-6">
        <div className="sm:col-span-4">
          <CardBalance data={balances} />
        </div>

        <div className="sm:col-span-4">
          <CardGoal data={goals} />
        </div>

        <div className="sm:col-span-4">
          <CardUpcomingBil data={bills} />
        </div>

        <div className="sm:col-span-4 sm:row-span-2">
          <CardRecentTransaction data={transactions} />
        </div>

        <div className="sm:col-span-8">
          <CardStatistic data={expensesStatistics} />
        </div>

        <div className="sm:col-span-8">
          <CardExpenseBeakdown data={expensesBreakdowns} />
        </div>
      </div>

      <AppSnackbar
      open={snackbar.open}
      message={snackbar.message}
      severity={snackbar.severity}
      onClose={handleCloseSnackbar}
      />
    </MainLayout>
  );
}

export default Dashboard;
