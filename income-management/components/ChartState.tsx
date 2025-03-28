"use client";

import React, { ReactNode, useState } from "react";
import { useActionOutside } from "@/general/hooks/useActionOutside";
import { IncomeState } from "@/data/types";

type ChartStateProps = {
  children: ReactNode;
  incomeState: IncomeState;
};

export function ChartState({ children, incomeState }: ChartStateProps) {
  const [collapsed, setCollapsed] = useState(false);
  const ref = useActionOutside<HTMLDivElement>(() => setCollapsed(true));

  // Create props to pass to children
  const childProps = {
    collapsed,
    hidden: collapsed, // For Legend component
    incomeState,
  };

  return (
    <div
      ref={ref}
      onClick={() => setCollapsed(!collapsed)}
      className="bg-secondaryBackground/10 fixed bottom-0 z-10 w-full border border-x-0 border-b-0 border-gray4/50 bg-background/10 pb-3 backdrop-blur-xl"
    >
      {/* Clone children and inject props */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { ...childProps });
        }
        return child;
      })}
    </div>
  );
}
