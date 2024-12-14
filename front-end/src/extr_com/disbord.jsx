import React from "react";
import { LineChart } from "@tremor/react";
import { Alert, Spinner } from "@nextui-org/react";

function LiveAreaChart() {
    const title = "This is an alert";
    const description = "Thanks for subscribing to our newsletter!";
  
    return (
        <div className="flex items-center justify-center w-full">
        <div className="flex flex-col w-full">
          {["default", "primary", "secondary", "success", "warning", "danger"].map((color) => (
            <div key={color} className="w-full flex items-center my-3">
              <Alert color={color} title={`This is a ${color} alert`} />
            </div>
          ))}
        </div>
        <Spinner color="warning" label="Loading..." />
      </div>
      
    )
    }

export default LiveAreaChart;
