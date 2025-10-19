/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { PriorityManager } from "./priority-manager";

type PriorityStore = {
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  priorityManager: PriorityManager;
};

export const PriorityContext = createContext<PriorityStore | undefined>(undefined);

type PriorityProviderProps = Readonly<{
  /**
   * defaults to 3
   */
  lastPriority?: number;
  children: ReactNode;
}>;

export function PriorityProvider({ children, lastPriority }: PriorityProviderProps) {
  const priorityManager = useMemo(() => new PriorityManager(lastPriority), []);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const ctxValue = useMemo(() => ({
    currentLevel,
    setCurrentLevel,
    priorityManager,
  }),
  [currentLevel, setCurrentLevel, priorityManager])

  return (
    <PriorityContext.Provider value={ctxValue}>
      {children}
    </PriorityContext.Provider>
  );
}

let id = 0;

export function usePriority(level: number) {
  const ctxValue = useContext(PriorityContext);
  if (!ctxValue) throw new Error("PriorityProvider is missing");
  
  const { currentLevel, setCurrentLevel, priorityManager } = ctxValue;
  const ref = useRef({ id: `${id++}`, level });
  const freePriority = priorityManager.registerItem(ref.current.level, ref.current.id);

  useEffect(() => {
    const unsub = priorityManager.onPriorityChanged(setCurrentLevel);
    return unsub;
  }, []);

  const memoized = useMemo(() => ({
    currentLevel,
    freePriority,
  }), [currentLevel, freePriority]);

  return memoized;
}

/**
 * @returns returns the current priority level
 */
export function usePriorityLevel() {
  const ctxValue = useContext(PriorityContext);
  if (!ctxValue) throw new Error("PriorityProvider is missing");
  return ctxValue.currentLevel;
}

export const FreePriorityContext = createContext<(() => void) | undefined>(undefined);

/**
 * @returns a function to free the current priority level and proceed to the next level.
 */
export function useFreePriority() {
  const freePriorityFn = useContext(FreePriorityContext);
  if (!freePriorityFn) throw new Error("useFreePriority used outside of FreePriorityContext");
  return freePriorityFn;
}
