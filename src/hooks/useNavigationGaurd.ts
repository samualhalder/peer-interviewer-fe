// hooks/useNavigationGuard.ts
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

export const useNavigationGuard = (
  shouldBlock: boolean,
  onConfirm: () => void,
  onCancel: () => void
) => {
  const router = useRouter();
  const pendingUrl = useRef<string | null>(null);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      if (shouldBlock && url !== router.asPath) {
        pendingUrl.current = url;
        router.events.emit("routeChangeError");
        onCancel(); // trigger modal here
        throw "Route change blocked";
      }
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [shouldBlock, router, onCancel]);

  const confirmNavigation = () => {
    if (pendingUrl.current) {
      const target = pendingUrl.current;
      pendingUrl.current = null;
      onConfirm(); // close modal
      router.push(target);
    }
  };

  return { confirmNavigation };
};
