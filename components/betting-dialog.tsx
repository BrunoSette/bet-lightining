"use client";

import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BettingOption {
  id: string;
  candidate: string;
  candidate_image: string;
  amount: number;
  current_odds: number;
  initial_odds: number;
  date: string;
}

interface BettingDialogProps {
  bet: BettingOption;
  type: "yes" | "no";
}

export function BettingDialog({ bet, type }: BettingDialogProps) {
  const [betAmount, setBetAmount] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBet = () => {
    if (betAmount) {
      console.log(
        `Placed a ${type} bet of $${betAmount} on ${bet.candidate}`
      );
      setBetAmount("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className={type === "yes" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-red-100 hover:bg-red-200 text-red-600"}
          size="lg"
          variant={type === "no" ? "secondary" : "default"}
          onClick={() => setIsDialogOpen(true)}
        >
          Buy {type === "yes" ? "Yes" : "No"} {type === "yes" ? bet.current_odds.toFixed(1) : (100 - bet.current_odds).toFixed(1)}¢
        </Button>
      </DialogTrigger>
      {/* Rest of your dialog JSX */}
    </Dialog>
  );
} 