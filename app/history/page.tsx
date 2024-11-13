import db from "@/lib/db";
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import BetValueChart from "../../components/BetValueChart";

interface Bet {
  id: string;
  candidate: string;
  candidateImage: string;
  type: "yes" | "no";
  amount: number;
  initialOdds: number;
  currentOdds: number;
  date?: string;
  value: number;
  status: "open" | "closed";
}

async function getBets(): Promise<Bet[]> {
  // Replace this with your actual data fetching logic
  // This could be a database query or external API call
  // Add some sample data or fetch from your data source
  const { rows: bets } = await db.query<Bet>(
    "SELECT * FROM transactions ORDER BY date DESC"
  );

  return bets;
}

export default async function BetHistory() {
  const bets = await getBets();

  // const chartData = bets.map((bet) => ({
  //   date: bet.date,
  //   value: bet.value,
  // }));

  const totalValue = bets.reduce((sum, bet) => sum + bet.value, 0);
  const totalInvested = bets.reduce((sum, bet) => sum + bet.amount, 0);
  const profitLoss = totalValue - totalInvested;

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

      {/* <BetValueChart chartData={chartData} /> */}

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
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
