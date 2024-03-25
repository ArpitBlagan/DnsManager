import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarSeparator,
} from "@/components/ui/menubar";
import { useMsal } from "@azure/msal-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
const scopes = ["https://management.azure.com/user_impersonation"];
const Nabar = () => {
  const { accounts, instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="flex flex-row justify-center items-center gap-2 border backdrop:xl mb-3 p-2 rounded-xl">
      <div>
        <Link to="/" className={buttonVariants({ variant: "link" })}>
          D.N.S manage
        </Link>
      </div>
      <div className="flex-1 flex flex-row justify-end items-center gap-2">
        {isAuthenticated ? (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer">
                Profile
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>{accounts[0].name}</MenubarItem>
                <MenubarItem disabled>{accounts[0].username}</MenubarItem>
                <MenubarItem>
                  <Button
                    variant={"destructive"}
                    onClick={(e) => {
                      e.preventDefault();
                      instance.logout();
                    }}
                  >
                    Logout
                  </Button>
                </MenubarItem>
                <MenubarItem disabled>Build with ❤️</MenubarItem>
                <MenubarSeparator />
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ) : (
          <Button
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              instance.loginPopup({ scopes });
            }}
          >
            LogIn
          </Button>
        )}
      </div>
    </div>
  );
};

export default Nabar;
