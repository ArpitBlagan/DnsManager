import { Dropdown } from "@/components/Dropdown";
import Data from "@/components/Data";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Main = () => {
  const { instance, accounts } = useMsal();
  const [accessToken, setAcc] = useState<null | string>(null);
  const [val, setVal] = useState("None");
  const [subscription, setSub] = useState<any[] | null>(null);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const getToken = async () => {
      toast("Trying to fetch Details of you Azure account");
      const ress = await instance.acquireTokenSilent({
        scopes: ["https://management.azure.com/user_impersonation"],
        account: accounts[0],
      });
      console.log(ress);
      setAcc(ress.accessToken);
      if (ress.accessToken) {
        toast("fetching subscriptions of your azure account..");
        var headers = new Headers();
        var bearer = "Bearer " + ress.accessToken;
        headers.append("Authorization", bearer);
        var options = {
          method: "GET",
          headers,
        };
        try {
          var graphEndpoint =
            "https://management.azure.com/subscriptions?api-version=2016-06-01";
          const res1 = await fetch(graphEndpoint, options);
          const ff = await res1.json();
          if (ff.value.length == 0) {
            toast.error("Not subscriptions");
            return;
          }
          setSub(ff.value);
          setVal(ff.value[0].subscriptionId);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getToken();
  }, [accounts, instance]);
  return (
    <div>
      {accessToken && (
        <div>
          <div className="flex flex-row gap-2 items-center justify-start">
            {subscription ? (
              <div className="flex justify-center items-center gap-3">
                <h1>Select Subscription</h1>
                <Dropdown
                  data={subscription}
                  val={val}
                  setVal={setVal}
                  type="Subscription"
                />
                <p>{val}</p>
              </div>
            ) : (
              <h1>Getting</h1>
            )}
          </div>
          {val != "None" && (
            <div>
              <Data
                val={val}
                accessToken={accessToken}
                data={data}
                setData={setData}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
