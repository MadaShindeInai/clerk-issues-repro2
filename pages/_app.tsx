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
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";

const UserButton2 = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

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
          <UserButton2>
            {!!data && data.isExpert ? (
              <p className="border border-purple-800">
                UserButton2.myExpertPage
              </p>
            ) : (
              <p className="border border-b-amber-900">
                UserButton2.becomeExpert
              </p>
            )}
          </UserButton2>
        </SignedIn>
      </header>
      {!!data && data.isExpert ? (
        <p className="border border-red-800">btn.myExpertPage</p>
      ) : (
        <p className="border border-blue-800">btn.becomeExpert</p>
      )}
      {children}
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  return (
    <ClerkProvider
      {...pageProps}
      localization={{
        footerPageLink__help: "By signing up you agree to our",
        footerPageLink__privacy: "privacy policy",
        footerPageLink__terms: "and",
      }}
      appearance={{
        elements: {
          selectOptionsContainer: "text-foreground dark:text-background",
          formButtonPrimary: "bg-primary text-black body-bold shadow-clerkbtn",
        },
      }}
      afterSignOutUrl={asPath}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}

export default MyApp;
