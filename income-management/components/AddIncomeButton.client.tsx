"use client";

import { useState } from "react";
import { Button } from "@/general/components/Button";

type AddIncomeButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function AddIncomeButton({ children, className }: AddIncomeButtonProps) {
  const [isAddingIncome, setIsAddingIncome] = useState(false);

  return (
    <Button
      onPress={() => setIsAddingIncome(true)}
      className={`text-income ${className}`}
    >
      {children}
    </Button>
  );
}
