import { useEffect, useState } from "react";

export const useAsyncLocalState = (loader) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [payload, setPayload] = useState(null);
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setLoadError(false);
        const result = await loader();
        setPayload(result);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setLoadError(true);
        setIsLoading(false);
      }
    };
    load();
  }, [loader]);
  return { isLoading, loadError, payload };
};
