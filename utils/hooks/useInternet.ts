import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

const useInternet = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const refresh = async () => {
    const refresh = await NetInfo.refresh();
    setIsConnected(refresh.isConnected);
  };

  return { isConnected, refresh };
};

export default useInternet;
