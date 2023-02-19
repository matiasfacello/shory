import * as React from "react";

interface LinkContextType {
  isLoadingMutation: boolean;
  setIsLoadingMutation: React.Dispatch<React.SetStateAction<boolean>>;
}

const LinkContext = React.createContext<LinkContextType | null>(null);

LinkContext.displayName = "LinkContext";

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [isLoadingMutation, setIsLoadingMutation] = React.useState(false);

  const value = React.useMemo(() => ({ isLoadingMutation, setIsLoadingMutation }), [isLoadingMutation, setIsLoadingMutation]);

  return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
}

export function useLinkContext() {
  const context = React.useContext(LinkContext);
  if (context === undefined || !context) {
    throw new Error("Provider missing");
  }
  return context;
}
