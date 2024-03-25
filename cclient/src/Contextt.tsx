import { createContext, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
interface data {
  accessToken: string;
}
export const context = createContext<data | null>(null);
const Contextt: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [accessToken, setAcc] = useState("");
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await instance.acquireTokenSilent({
          scopes: ["https://management.azure.com/user_impersonation"],
          account: accounts[0],
        });
        setAcc(res.accessToken);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getAccessToken();
  }, [instance, accounts]);
  return (
    <context.Provider value={{ accessToken }}>{children}</context.Provider>
  );
};

export default Contextt;
