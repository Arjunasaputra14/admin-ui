import React, { useState, useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Icon from "../components/elements/Icon";

function ExpensesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [expensesData, setExpensesData] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    setIsLoading(true);

    setTimeout(() => {
      setExpensesData([
        {
          id: 1,
          items: [
            {
              icon: "House",
              category: "Housing",
              amount: 250,
              percentage: "15%",
              trend: "up",
              compareText: "Compare to the last month",
              type: "header",
            },
            { category: "House Rent", amount: 230, date: "17 May 2023", type: "item" },
            { category: "Parking", amount: 20, date: "17 May 2023", type: "item" },
          ],
        },
        {
          id: 2,
          items: [
            {
              icon: "Food",
              category: "Food",
              amount: 350,
              percentage: "8%",
              trend: "down",
              compareText: "Compare to the last month",
              type: "header",
            },
            { category: "Grocery", amount: 230, date: "17 May 2023", type: "item" },
            { category: "Restaurant Bill", amount: 120, date: "17 May 2023", type: "item" },
          ],
        },
        {
          id: 3,
          items: [
            {
              icon: "Transport",
              category: "Transportation",
              amount: 50,
              percentage: "12%",
              trend: "down",
              compareText: "Compare to the last month",
              type: "header",
            },
            { category: "Taxi Fare", amount: 30, date: "17 May 2023", type: "item" },
            { category: "Metro Card Bill", amount: 20, date: "17 May 2023", type: "item" },
          ],
        },
        {
          id: 4,
          items: [
            {
              icon: "Movie",
              category: "Entertainment",
              amount: 80,
              percentage: "15%",
              trend: "down",
              compareText: "Compare to the last month",
              type: "header",
            },
            { category: "Movie Ticket", amount: 30, date: "17 May 2023", type: "item" },
            { category: "iTunes", amount: 50, date: "17 May 2023", type: "item" },
          ],
        },
        {
          id: 5,
          items: [
            {
              icon: "Shopping",
              category: "Shopping",
              amount: 420,
              percentage: "25%",
              trend: "up",
              compareText: "Compare to the last month",
              type: "header",
            },
            { category: "Shirt", amount: 230, date: "17 May 2023", type: "item" },
            { category: "Jeans", amount: 190, date: "17 May 2023", type: "item" },
          ],
        },
        {
          id: 6,
          items: [
            {
              icon: "Other",
              category: "Others",
              amount: 50,
              percentage: "23%",
              trend: "up",
              compareText: "Compare to the last month",
              type: "header",
            },
            { category: "Donation", amount: 30, date: "17 May 2023", type: "item" },
            { category: "Gift", amount: 20, date: "17 May 2023", type: "item" },
          ],
        },
      ]);

      setIsLoading(false);
    }, 2000);
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <h1 className="text-lg font-medium text-gray-700">
          Expenses Comparison
        </h1>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)]">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
            <div className="absolute inset-0 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="mt-4 text-sm text-teal-500 font-medium">
            Loading Data
          </p>
        </div>
      ) : (
        <div className="p-4 bg-gray-50 min-h-[calc(100vh-180px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expensesData.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                {group.items.map((item, index) => {
                  const IconComponent = Icon[item.icon];

                  return (
                    <div key={index}>
                      {item.type === "header" && (
                        <div className="bg-gray-100 p-4 flex gap-3">
                          {/* ICON */}
                          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                            {IconComponent && (
                              <IconComponent size={18} color="#9CA3AF" />
                            )}
                          </div>

                          {/* TITLE */}
                          <div className="flex-1">
                            <p className="text-xs text-gray-500">
                              {item.category}
                            </p>
                            <p className="text-xl font-bold text-gray-900">
                              ${item.amount}
                            </p>
                          </div>

                          {/* TREND */}
                          <div className="text-right">
                            <p
                              className={`text-xs font-semibold ${
                                item.trend === "up"
                                  ? "text-red-500"
                                  : "text-green-500"
                              }`}
                            >
                              {item.percentage} {item.trend === "up" ? "↑" : "↓"}
                            </p>
                            <p className="text-[10px] text-gray-400 max-w-[120px]">
                              {item.compareText}
                            </p>
                          </div>
                        </div>
                      )}

                      {item.type === "item" && (
                        <div className="p-4 border-t border-gray-100 flex justify-between">
                          <p className="text-xs text-gray-700">
                            {item.category}
                          </p>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-900">
                              ${item.amount}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              {item.date}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default ExpensesPage;
