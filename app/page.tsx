"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
// import { RefreshCw } from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  // Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BettingOption {
  name: string;
  image: string;
  volume: string;
  chance: number;
  yesPrice: number;
  noPrice: number;
  historicalData: { date: string; chance: number }[];
}

export default function BettingInterfaceWithGraphs() {
  const [options] = useState<BettingOption[]>([
    {
      name: "Lula",
      image: "/lula.jpg?height=64&width=64",
      volume: "5,208,887",
      chance: 52.4,
      yesPrice: 52.4,
      noPrice: 47.6,
      historicalData: [
        { date: "2023-01", chance: 45 },
        { date: "2023-02", chance: 47 },
        { date: "2023-03", chance: 49 },
        { date: "2023-04", chance: 51 },
        { date: "2023-05", chance: 52.4 },
      ],
    },
    {
      name: "Bolsonaro",
      image: "/bolsonaro.jpg",
      volume: "3,845,221",
      chance: 35.2,
      yesPrice: 35.2,
      noPrice: 64.8,
      historicalData: [
        { date: "2023-01", chance: 38 },
        { date: "2023-02", chance: 37 },
        { date: "2023-03", chance: 36 },
        { date: "2023-04", chance: 35.5 },
        { date: "2023-05", chance: 35.2 },
      ],
    },
    {
      name: "Tarcísio",
      image: "/tarcisio.jpg",
      volume: "2,987,654",
      chance: 28.1,
      yesPrice: 28.1,
      noPrice: 71.9,
      historicalData: [
        { date: "2023-01", chance: 31 },
        { date: "2023-02", chance: 30 },
        { date: "2023-03", chance: 29 },
        { date: "2023-04", chance: 28.5 },
        { date: "2023-05", chance: 28.1 },
      ],
    },
    {
      name: "Michelle",
      image: "/michelle.jpg",
      volume: "1,456,789",
      chance: 18.8,
      yesPrice: 18.8,
      noPrice: 81.2,
      historicalData: [
        { date: "2023-01", chance: 15 },
        { date: "2023-02", chance: 16 },
        { date: "2023-03", chance: 17 },
        { date: "2023-04", chance: 18 },
        { date: "2023-05", chance: 18.8 },
      ],
    },
    {
      name: "Caiado",
      image: "/caiado.jpg",
      volume: "2,166,138",
      chance: 12.6,
      yesPrice: 12.6,
      noPrice: 87.4,
      historicalData: [
        { date: "2023-01", chance: 15 },
        { date: "2023-02", chance: 14 },
        { date: "2023-03", chance: 13.5 },
        { date: "2023-04", chance: 13 },
        { date: "2023-05", chance: 12.6 },
      ],
    },
    {
      name: "Ratinho",
      image: "/ratinho.webp",
      volume: "1,866,138",
      chance: 8.8,
      yesPrice: 8.8,
      noPrice: 91.2,
      historicalData: [
        { date: "2023-01", chance: 11 },
        { date: "2023-02", chance: 10 },
        { date: "2023-03", chance: 9.5 },
        { date: "2023-04", chance: 9 },
        { date: "2023-05", chance: 8.8 },
      ],
    },
    {
      name: "Zema",
      image: "/zema.jpg",
      volume: "1,566,138",
      chance: 6.1,
      yesPrice: 6.1,
      noPrice: 93.9,
      historicalData: [
        { date: "2023-01", chance: 8 },
        { date: "2023-02", chance: 7.5 },
        { date: "2023-03", chance: 7 },
        { date: "2023-04", chance: 6.5 },
        { date: "2023-05", chance: 6.1 },
      ],
    },
    {
      name: "Leite",
      image: "/leite.png",
      volume: "1,266,138",
      chance: 4.8,
      yesPrice: 4.8,
      noPrice: 95.2,
      historicalData: [
        { date: "2023-01", chance: 7 },
        { date: "2023-02", chance: 6.5 },
        { date: "2023-03", chance: 5.8 },
        { date: "2023-04", chance: 5.2 },
        { date: "2023-05", chance: 4.8 },
      ],
    },
  ]);
  const [selectedBet, setSelectedBet] = useState<{
    option: BettingOption;
    type: "yes" | "no";
  } | null>(null);
  const [betAmount, setBetAmount] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBet = () => {
    if (selectedBet && betAmount) {
      console.log(
        `Placed a ${selectedBet.type} bet of $${betAmount} on ${selectedBet.option.name}`
      );
      // Here you would typically send this data to your backend
      setSelectedBet(null);
      setBetAmount("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      {/* <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-muted-foreground">OUTCOME</h2>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-muted-foreground">
            % CHANCE
          </h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh odds</span>
          </Button>
        </div>
      </div> */}

      <div className="space-y-8">
        {options.map((option, index) => (
          <div key={option.name} className="border-t pt-4">
            <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={option.image}
                  alt={option.name}
                  className="object-cover"
                />
                <AvatarFallback>{option.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <h3 className="text-xl font-bold">{option.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{option.volume} sats</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <span className="sr-only">View volume details</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M7 7h10" />
                      <path d="M7 12h10" />
                      <path d="M7 17h10" />
                    </svg>
                  </Button>
                </div>
              </div>

              <span className="text-4xl font-bold">
                {option.chance.toFixed(1)}%
              </span>

              <div className="flex gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      size="lg"
                      onClick={() => {
                        setSelectedBet({ option, type: "yes" });
                        setIsDialogOpen(true);
                      }}
                    >
                      Buy Yes {option.yesPrice.toFixed(1)}¢
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">
                        Place a Bet
                      </DialogTitle>
                      <DialogDescription className="text-lg">
                        You are betting {selectedBet?.type.toUpperCase()} on{" "}
                        {selectedBet?.option.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage
                            src={selectedBet?.option.image}
                            alt={selectedBet?.option.name}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {selectedBet?.option.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-xl font-semibold">
                            {selectedBet?.option.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Current price:{" "}
                            {selectedBet?.type === "yes"
                              ? selectedBet?.option.yesPrice.toFixed(1)
                              : selectedBet?.option.noPrice.toFixed(1)}
                            ¢
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bet-amount" className="text-right">
                          Amount
                        </Label>
                        <Input
                          id="bet-amount"
                          type="number"
                          value={betAmount}
                          onChange={(e) => setBetAmount(e.target.value)}
                          className="col-span-3"
                          placeholder="Enter bet amount"
                        />
                      </div>
                    </div>
                    <DialogFooter className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        onClick={() => console.log("Add funds clicked")}
                      >
                        Add Funds
                      </Button>
                      <Button
                        type="submit"
                        onClick={handleBet}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Place Bet
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-red-100 hover:bg-red-200 text-red-600"
                      variant="secondary"
                      size="lg"
                      onClick={() => {
                        setSelectedBet({ option, type: "no" });
                        setIsDialogOpen(true);
                      }}
                    >
                      Buy No {option.noPrice.toFixed(1)}¢
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">
                        Place a Bet
                      </DialogTitle>
                      <DialogDescription className="text-lg">
                        You are betting {selectedBet?.type.toUpperCase()} on{" "}
                        {selectedBet?.option.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage
                            src={selectedBet?.option.image}
                            alt={selectedBet?.option.name}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {selectedBet?.option.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-xl font-semibold">
                            {selectedBet?.option.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Current price:{" "}
                            {selectedBet?.type === "yes"
                              ? selectedBet?.option.yesPrice.toFixed(1)
                              : selectedBet?.option.noPrice.toFixed(1)}
                            ¢
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bet-amount" className="text-right">
                          Amount
                        </Label>
                        <Input
                          id="bet-amount"
                          type="number"
                          value={betAmount}
                          onChange={(e) => setBetAmount(e.target.value)}
                          className="col-span-3"
                          placeholder="Enter bet amount"
                        />
                      </div>
                    </div>
                    <DialogFooter className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        onClick={() => console.log("Add funds clicked")}
                      >
                        Add Funds
                      </Button>
                      <Button
                        type="submit"
                        onClick={handleBet}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Place Bet
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="flex justify-center mt-2">
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => {
                  const element = document.getElementById(
                    `chart-${option.name}`
                  );
                  if (element) {
                    element.classList.toggle("hidden");
                  }
                }}
              >
                Show/Hide Chart
              </Button>
            </div>

            <CardContent id={`chart-${option.name}`} className="hidden">
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
                  <LineChart data={option.historicalData}>
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
          </div>
        ))}
      </div>
    </Card>
  );
}
