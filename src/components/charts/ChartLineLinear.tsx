

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "Jan", earnings: 3500000 },
  { month: "Feb", earnings: 3000000 },
  { month: "Mar", earnings: 2800000 },
  { month: "Apr", earnings: 2600000 },
  { month: "May", earnings: 2400000 },
  { month: "Jun", earnings: 900000 },
  { month: "Jul", earnings: 4200000 },
  { month: "Aug", earnings: 1800000 },
  { month: "Sep", earnings: 5200000 },
  { month: "Oct", earnings: 2600000 },
  { month: "Nov", earnings: 4800000 },
]

const chartConfig = {
  earnings: {
    label: "Income",
    color: "#22c55e", // green
  },
}

export function ChartLineLinear() {
  return (
    <Card className="border-0 rounded-2xl bg-[#1f1f1f]/70 w-[1030px]">
      <CardHeader className="pb-4 flex items-center justify-between">
        <CardTitle className="text-white text-lg">
          Earnings
        </CardTitle>
        {/* Income and date dropdown can go here */}
        <div className="flex justify-between">
          <div className=" flex items-center mt-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <div className="text-white text-sm ml-2">Income</div>
          </div>
{/* dropdown */}
<div className="ml-4"></div>
  <select className=" border bg-[#1f1f1f]/70 border-gray-600 text-white text-sm rounded-md p-2 w-[84px] h-[45px]  focus:outline-none focus:ring-2 focus:ring-green-500">
    <option>2024</option>
    <option>2025</option>
    <option>2026</option>
    <option>2027</option>
  </select>


        </div>
      </CardHeader>

      <CardContent className=" p-6 ">
        <ChartContainer config={chartConfig} className="h-[260px] w-[500px] lg:w-[980px]">
          <LineChart
            data={chartData}
            margin={{ top: 10, left: 10, right: 10 }}
          
          >
            {/* Grid */}
            <CartesianGrid
              vertical={false}
              stroke="#2a2a2a"
              strokeDasharray="3 3"
            />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            {/* Y Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) =>
                value >= 1_000_000
                  ? `${value / 1_000_000}M`
                  : `${value / 1000}K`
              }
            />

            {/* Tooltip */}
            <ChartTooltip
              cursor={{ stroke: "#22c55e", strokeWidth: 1 }}
              content={<ChartTooltipContent />}
            />

            {/* Line */}
           
            <Line dataKey="earnings" type="linear" stroke="#22c55e" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
