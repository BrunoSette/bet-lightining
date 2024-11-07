"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Bet {
  id: string;
  candidate: string;
  candidateImage: string;
  type: "yes" | "no";
  amount: number;
  initialOdds: number;
  currentOdds: number;
  date: string;
  value: number;
  status: "open" | "closed";
}

export default function BetHistory() {
  const [bets, setBets] = useState<Bet[]>([
    {
      id: "1",
      candidate: "Candidate A",
      candidateImage: "/placeholder.svg?height=100&width=100",
      type: "yes",
      amount: 100,
      initialOdds: 96.1,
      currentOdds: 97.5,
      date: "2023-05-01",
      value: 101.46,
      status: "open",
    },
    {
      id: "2",
      candidate: "Other",
      candidateImage: "/placeholder.svg?height=100&width=100",
      type: "no",
      amount: 50,
      initialOdds: 96.5,
      currentOdds: 95.8,
      date: "2023-05-02",
      value: 50.36,
      status: "closed",
    },
    {
      id: "3",
      candidate: "Candidate B",
      candidateImage: "/placeholder.svg?height=100&width=100",
      type: "yes",
      amount: 75,
      initialOdds: 45.0,
      currentOdds: 48.2,
      date: "2023-05-03",
      value: 80.33,
      status: "open",
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null);

  const chartData = bets.map((bet) => ({
    date: bet.date,
    value: bet.value,
  }));

  const totalValue = bets.reduce((sum, bet) => sum + bet.value, 0);
  const totalInvested = bets.reduce((sum, bet) => sum + bet.amount, 0);
  const profitLoss = totalValue - totalInvested;

  const handleCloseBet = (bet: Bet) => {
    setSelectedBet(bet);
    setDialogOpen(true);
  };

  const confirmCloseBet = () => {
    if (selectedBet) {
      setBets((prevBets) =>
        prevBets.map((bet) =>
          bet.id === selectedBet.id
            ? { ...bet, status: "closed" as const }
            : bet
        )
      );
      setDialogOpen(false);
      setSelectedBet(null);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Bet History</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalInvested.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                profitLoss >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ${profitLoss.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bet Value Over Time</CardTitle>
          <CardDescription>Total value of your bets</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Value",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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
                  tickFormatter={(value) => `$${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bet History</CardTitle>
          <CardDescription>
            Your past bets and their current values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Initial Odds</TableHead>
                <TableHead>Current Odds</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Profit/Loss</TableHead>
                <TableHead>Profit/Loss %</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bets.map((bet) => {
                const profitLoss = bet.value - bet.amount;
                const profitLossPercentage =
                  ((bet.value - bet.amount) / bet.amount) * 100;
                return (
                  <TableRow key={bet.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={bet.candidateImage}
                            alt={bet.candidate}
                          />
                          <AvatarFallback>{bet.candidate[0]}</AvatarFallback>
                        </Avatar>
                        <span>{bet.candidate}</span>
                      </div>
                    </TableCell>
                    <TableCell>{bet.type === "yes" ? "Yes" : "No"}</TableCell>
                    <TableCell>${bet.amount.toFixed(2)}</TableCell>
                    <TableCell>{bet.initialOdds.toFixed(1)}¢</TableCell>
                    <TableCell>{bet.currentOdds.toFixed(1)}¢</TableCell>
                    <TableCell>{bet.date}</TableCell>
                    <TableCell>${bet.value.toFixed(2)}</TableCell>
                    <TableCell
                      className={
                        profitLoss >= 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      ${profitLoss.toFixed(2)}
                    </TableCell>
                    <TableCell
                      className={
                        profitLoss >= 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {profitLossPercentage > 0 ? "+" : ""}
                      {profitLossPercentage.toFixed(2)}%
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          bet.status === "open" ? "default" : "secondary"
                        }
                      >
                        {bet.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {bet.status === "open" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCloseBet(bet)}
                        >
                          Close Bet
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Closing Bet</DialogTitle>
            <DialogDescription>
              Are you sure you want to close this bet?
            </DialogDescription>
          </DialogHeader>
          {selectedBet && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={selectedBet.candidateImage}
                    alt={selectedBet.candidate}
                  />
                  <AvatarFallback>{selectedBet.candidate[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{selectedBet.candidate}</h4>
                  <p className="text-sm text-muted-foreground">
                    Current odds: {selectedBet.currentOdds.toFixed(1)}¢
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Current value: ${selectedBet.value.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm ${
                      selectedBet.value - selectedBet.amount >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Profit/Loss: $
                    {(selectedBet.value - selectedBet.amount).toFixed(2)} (
                    {(
                      ((selectedBet.value - selectedBet.amount) /
                        selectedBet.amount) *
                      100
                    ).toFixed(2)}
                    %)
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmCloseBet}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
