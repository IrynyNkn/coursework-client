import React, {createContext, useState} from "react";

type LoadingProviderType = {
  children: React.ReactNode
}

type LoadingContextState = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>> | null;
}

const LoadingContext = createContext<LoadingContextState>({
  loading: false,
  setLoading: null,
});

export function LoadingProvider({ children }: LoadingProviderType) {
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

