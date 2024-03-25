import { useLocation } from "react-router-dom";
import RecordTable from "./RecordTable";
const Records = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="min-h-screen">
      {state.accessToken &&
      state.subscriptionId &&
      state.zoneName &&
      state.resourceGroupName ? (
        <RecordTable
          accessToken={state.accessToken}
          subscriptionId={state.subscriptionId}
          resourceGroupName={state.resourceGroupName}
          zoneName={state.zoneName}
        />
      ) : (
        <h1>trying to fetch the data...</h1>
      )}
    </div>
  );
};

export default Records;
