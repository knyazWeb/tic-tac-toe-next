"use client";

import { OnlinePlayContext } from "@/contexts/singlePlayContext";

const OnlinePlayProvider = ({ children, value }: { children: React.ReactNode; value: boolean }) => {
  return <OnlinePlayContext.Provider value={value}>{children}</OnlinePlayContext.Provider>;
};
export default OnlinePlayProvider;
