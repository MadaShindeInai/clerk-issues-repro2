import "@/styles/globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { PropsWithChildren, useEffect, useState } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  const { user } = useUser();
  const [data, setData] = useState<{ isExpert: boolean } | null>(null);

  useEffect(() => {
    if (user?.id) {
      setData({
        isExpert: true,
      });
    }
  }, [user?.id]);

  return (
    <div style={{ display: "flex", marginRight: "5px" }}>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton
            // afterSignOutUrl={asPath}
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: 40,
                  height: 40,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              {!!data && data.isExpert ? (
                <UserButton.Link
                  label={"btn.myExpertPage"}
                  labelIcon={<div>1</div>}
                  href="/test"
                />
              ) : (
                <UserButton.Link
                  label={"btn.becomeExpert"}
                  labelIcon={<div>2</div>}
                  href="/test2"
                />
              )}
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </header>
      {!!data && data.isExpert ? (
        <p>btn.myExpertPage</p>
      ) : (
        <p>btn.becomeExpert</p>
      )}
      {children}
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}

export default MyApp;
