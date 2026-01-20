
import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {  ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart with text"


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "#A67102",
  },
} 
interface ChartRadialTextProps {
  value: number
}

export function ChartRadialText( { value }: ChartRadialTextProps) {
  const chartData = [
  { browser: "safari", reviews: value, fill: "#A67102" },
]
  const startAngle = -90                  // top position
  const endAngle = -90 + (value * 3.6)
  return (
    <Card className="flex flex-col bg-transparent border-0 h-60">

      <CardContent className="flex-1 pb-0">

          {/* Custom track circle (light grey), no gap */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg   className="absolute top-22 left-24 sm:top-24 sm:left-28 sm:w-[49%] sm:h-[49%] m-auto w-[53%] h-[53%]"
  viewBox="0 0 100 100" >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#ffffffff"
                strokeWidth="6"
                fill="none"
              />
            </svg>
          </div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]  "
          
        >
          <RadialBarChart
            data={chartData}
             startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={80}
            outerRadius={130}
            className="border-0 relative -top-2 -right-1 w-[250px] h-[250px]"
            
         
          >
           <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              polarRadius={[86, 74]}
            />

            <RadialBar dataKey="reviews" background={{ fill: "white" }} cornerRadius={30} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-4xl font-bold bg"
                        >
                          {value}%
                        </tspan>
                   
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
  
      </CardFooter>
    </Card>
  )
}
