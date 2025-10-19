import { memo, type ReactNode } from "react";
import { PriorityProvider, FreePriorityContext, usePriority } from "./priority-context";

type PriorityProps = Readonly<{
  level: number;
  children: ReactNode;
  fallback?: ReactNode;
}>;

export function Priority({ level, children, fallback }: PriorityProps) {
  const { currentLevel, freePriority } = usePriority(level);

  return (
    <MemoizedToggle show={level <= currentLevel} fallback={fallback}>
      <FreePriorityContext.Provider value={freePriority}>
        {children}
      </FreePriorityContext.Provider>
    </MemoizedToggle>
  );
}

Priority.Provider = PriorityProvider; // compounds the component

type MemoizedToggleProps = {
  show: boolean;
  children: ReactNode;
  fallback: ReactNode;
};

const MemoizedToggle = memo(({
  show,
  children,
  fallback,
}: MemoizedToggleProps) => (
  show ? children : fallback
));
