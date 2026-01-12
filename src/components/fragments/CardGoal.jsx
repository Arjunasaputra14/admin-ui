import React from "react";
import Card from "../elements/Card";
import Icon from "../elements/Icon";
import CompositionExample from "../elements/CompositionExample";
import CircularProgress from "@mui/material/CircularProgress";

function CardGoal(props) {
  const { data = {} } = props;

  const presentAmount = data.presentAmount ?? 0;
  const targetAmount = data.targetAmount ?? 0;

  const chartValue =targetAmount > 0 ? (data.present_Amount / data.target_Amount) * 100 :0;

  return (
    <>
      <Card
        title="Goals"
        desc={
          <div className="p-2">
            <div className="flex justify-between items-center">
              <div className="flex">
                <span className="text-2xl font-bold me-4">
                  ${data.target_Amount}
                </span>
                <div className="p-2 bg-gray-05 text-gray-01 rounded-md box-border">
                  <Icon.Edit size={16} />
                </div>
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
                    <div className="font-bold text-xl text-black">
                      ${data.presentAmount}
                    </div>
                  </div>
                </div>

                <div className="flex text-gray-01">
                  <Icon.Target />
                  <div className="ms-2">
                    <div>This Month Target</div>
                    <div className="font-bold text-xl text-black">
                      ${data.targetAmount}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ms-4 text-center">
                <CompositionExample data={chartValue} />
                <div className="flex justify-between">
                  <span className="text-gray-03">$0</span>
                  <span className="font-bold text-2xl">12K</span>
                  <span className="text-gray-03">$20K</span>
                </div>
                <div className="mt-2">Target vs Achievement</div>
              </div>
            </div>
          </div>
        }
      />
    </>
  );

  return (
	<>
		<Card title="Goals" 
		desc={
          Object.keys(data).length === 0 ? (
	        <div className="flex flex-col justify-center items-center h-full text-primary">
              <CircularProgress color="inherit" size={50} enableTrackSlot />
              Loading Data
            </div>
          ) : (
            chartData
          )
        }
	
	/>
	</>
  )
}

export default CardGoal;
