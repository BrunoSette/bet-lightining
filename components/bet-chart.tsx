"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BetChartProps {
  bet: {
    id: string;
    date: string;
    initial_odds: number;
    current_odds: number;
  };
  index: number;
}

export function BetChart({ bet, index }: BetChartProps) {
  return (
    <>
      <div className="flex justify-center mt-2">
        <Button
          variant="ghost"
          className="text-sm"
          onClick={() => {
            const element = document.getElementById(`chart-${bet.id}`);
            if (element) {
              element.classList.toggle("hidden");
            }
          }}
        >
          Show/Hide Chart
        </Button>
      </div>

      <CardContent id={`chart-${bet.id}`} className="hidden">
        <ChartContainer
          config={{
            chance: {
              label: "Chance",
              color:
                index === 0
                  ? "hsl(var(--chart-1))"
                  : "hsl(var(--chart-2))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { date: bet.date, chance: bet.initial_odds },
                {
                  date: new Date().toISOString().split("T")[0],
                  chance: bet.current_odds,
                },
              ]}
            >
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="chance"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </>
  );
} 