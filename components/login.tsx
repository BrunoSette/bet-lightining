"use client";

import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";

export default function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const [lnurl, setLnurl] = useState("");

  useEffect(() => {
    if (isOpen) {
      console.log("Fetching LNURL-auth URL...");
      fetch("/api/lnurl-auth")
        .then((res) => {
          console.log("Response received:", res);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Data received:", data);
          setLnurl(data.lnurlAuthUrl);
        })
        .catch((error) => {
          console.error("Error fetching LNURL-auth URL:", error);
        });
    }
  }, [isOpen]);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Login with Lightning
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login with Lightning</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Please connect your Lightning wallet to continue.
          </DialogDescription>
          <div className="flex justify-center">
            {lnurl ? (
              <QRCode value={lnurl} size={200} />
            ) : (
              <p>Loading QR code...</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
