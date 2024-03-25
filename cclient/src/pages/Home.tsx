import { useIsAuthenticated } from "@azure/msal-react";
import Guide from "@/components/Guide";
import Main from "./Main";

const Home = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div>
      {isAuthenticated && <Main />}
      <Guide />
    </div>
  );
};

export default Home;
