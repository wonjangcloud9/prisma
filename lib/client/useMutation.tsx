import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data: any | undefined;
  error: any | undefined;
}
type useMutationResult = [(data: any) => void, UseMutationState];
export default function useMutation(url: string): useMutationResult {
  const [state, setSate] = useState<UseMutationState>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setSate((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json().catch(() => {});
      })
      .then((data) => setSate((prev) => ({ ...prev, data })))
      .then((error) => setSate((prev) => ({ ...prev, error })))
      .finally(() => setSate((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
