import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import db from "@/lib/db";
import { BettingDialog } from "@/components/betting-dialog";
import { BetChart } from "@/components/bet-chart";

interface BettingOption {
  id: string;
  candidate: string;
  candidate_image: string;
  amount: number;
  current_odds: number;
  initial_odds: number;
  date: string;
}

export default async function BettingInterfaceWithGraphs() {
  const { rows: bets } = await db.query<BettingOption>(
    "SELECT * FROM bets ORDER BY date DESC"
  );

  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        {bets.map((bet, index) => (
          <div key={bet.id} className="border-t pt-4">
            <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={bet.candidate_image}
                  alt={bet.candidate}
                  className="object-cover"
                />
                <AvatarFallback>{bet.candidate[0]}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <h3 className="text-xl font-bold">{bet.candidate}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{bet.amount} sats</span>
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
                {bet.current_odds.toFixed(1)}%
              </span>

              <div className="flex gap-2">
                <BettingDialog bet={bet} type="yes" />
                <BettingDialog bet={bet} type="no" />
              </div>
            </div>

            <BetChart bet={bet} index={index} />
          </div>
        ))}
      </div>
    </Card>
  );
}
