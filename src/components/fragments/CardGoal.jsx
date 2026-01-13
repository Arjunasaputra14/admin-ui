import React, { useState, useEffect } from "react";
import Card from "../elements/Card";
import Icon from "../elements/Icon";
import CompositionExample from "../elements/CompositionExample";
import CircularProgress from "@mui/material/CircularProgress";

function CardGoal(props) {
  const { data = {} } = props;

  // State untuk menyimpan nilai yang bisa diedit
  const [presentAmount, setPresentAmount] = useState(data.present_Amount ?? 0);
  const [targetAmount, setTargetAmount] = useState(data.target_Amount ?? 0);
  
  // State untuk mode editing
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [isEditingPresent, setIsEditingPresent] = useState(false);
  
  // State temporary untuk input
  const [tempTarget, setTempTarget] = useState(targetAmount);
  const [tempPresent, setTempPresent] = useState(presentAmount);

  // Hitung chart value dengan pengecekan untuk menghindari NaN
  const chartValue = targetAmount > 0 ? (presentAmount / targetAmount) * 100 : 0;

  // Handler untuk save target
  const handleSaveTarget = () => {
    setTargetAmount(tempTarget);
    setIsEditingTarget(false);
  };

  // Handler untuk save present amount
  const handleSavePresent = () => {
    setPresentAmount(tempPresent);
    setIsEditingPresent(false);
  };

  // Handler untuk cancel
  const handleCancelEdit = () => {
    setTempTarget(targetAmount);
    setTempPresent(presentAmount);
    setIsEditingTarget(false);
    setIsEditingPresent(false);
  };

  // Format number dengan K
  const formatNumber = (num) => {
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num}`;
  };

  // Update data dari props jika berubah
  useEffect(() => {
    if (data.present_Amount !== undefined) {
      setPresentAmount(data.present_Amount);
      setTempPresent(data.present_Amount);
    }
    if (data.target_Amount !== undefined) {
      setTargetAmount(data.target_Amount);
      setTempTarget(data.target_Amount);
    }
  }, [data.present_Amount, data.target_Amount]);

  const chartData = (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {isEditingTarget ? (
            <div className="flex items-center gap-2">
              <span className="text-xl">$</span>
              <input
                type="number"
                value={tempTarget}
                onChange={(e) => setTempTarget(Number(e.target.value))}
                className="text-2xl font-bold border-2 border-primary rounded px-2 py-1 w-32"
                placeholder="Target"
                autoFocus
              />
              <button
                onClick={handleSaveTarget}
                className="p-2 bg-primary text-white rounded-md hover:opacity-80"
                title="Save"
              >
                ✓
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-2 bg-red-500 text-white rounded-md hover:opacity-80"
                title="Cancel"
              >
                ✕
              </button>
            </div>
          ) : (
            <>
              <span className="text-2xl font-bold me-4">
                ${targetAmount}
              </span>
              <div 
                onClick={() => {
                  setIsEditingTarget(true);
                  setTempTarget(targetAmount);
                }}
                className="p-2 bg-gray-05 text-gray-01 rounded-md box-border cursor-pointer hover:bg-gray-10 transition-colors"
                title="Edit Target"
              >
                <Icon.Edit size={16} />
              </div>
            </>
          )}
        </div>
        <div>Nov, 2023</div>
      </div>

      <div className="border-b-2 border-gray-05 my-4"></div>

      <div className="flex justify-between">
        <div>
          <div className="flex mt-3 mb-10 text-gray-01">
            <Icon.Award />
            <div className="ms-2">
              <div>Target Achieved</div>
              {isEditingPresent ? (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg">$</span>
                  <input
                    type="number"
                    value={tempPresent}
                    onChange={(e) => setTempPresent(Number(e.target.value))}
                    className="font-bold text-xl border-2 border-primary rounded px-2 py-1 w-28"
                    placeholder="Amount"
                    autoFocus
                  />
                  <button
                    onClick={handleSavePresent}
                    className="p-1 bg-primary text-white rounded hover:opacity-80 text-sm"
                  >
                    ✓
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 bg-red-500 text-white rounded hover:opacity-80 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="font-bold text-xl text-black">
                    ${presentAmount}
                  </div>
                  <button
                    onClick={() => {
                      setIsEditingPresent(true);
                      setTempPresent(presentAmount);
                    }}
                    className="p-1 text-gray-01 hover:text-primary cursor-pointer"
                    title="Edit Progress"
                  >
                    <Icon.Edit size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex text-gray-01">
            <Icon.Target />
            <div className="ms-2">
              <div>This Month Target</div>
              <div className="font-bold text-xl text-black">
                ${targetAmount}
              </div>
            </div>
          </div>
        </div>

        <div className="ms-4 text-center">
          <CompositionExample data={chartValue} />
          <div className="flex justify-between gap-2">
            <span className="text-gray-03">$0</span>
            <span className="font-bold text-2xl text-primary">
              {formatNumber(presentAmount)}
            </span>
            <span className="text-gray-03">
              {formatNumber(targetAmount)}
            </span>
          </div>
          <div className="mt-2">Target vs Achievement</div>
        </div>
      </div>

      {/* Progress Info */}
      {targetAmount > 0 && (
        <div className="mt-4 p-3 bg-gray-05 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-01">Progress:</span>
            <span className="font-bold text-primary">
              {chartValue.toFixed(1)}% Complete
            </span>
          </div>
          {presentAmount < targetAmount && (
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-01">Remaining:</span>
              <span className="font-bold text-orange-500">
                ${(targetAmount - presentAmount).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Card 
        title="Goals" 
        desc={
          Object.keys(data).length === 0 && targetAmount === 0 && presentAmount === 0 ? (
            <div className="flex flex-col justify-center items-center h-full text-primary">
              <CircularProgress color="inherit" size={50} />
              <div className="mt-2">Loading Data</div>
            </div>
          ) : (
            chartData
          )
        }
      />
    </>
  );
}

export default CardGoal;