import React from "react";
import { providers, signIn, getSession, csrfToken } from "next-auth/client";

export default function SignIn({ providers }) {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h1>Welcome to our custom page</h1>
      <div>
        <div>
          {Object.values(providers).map((provider) => {
            if (provider.name === "Email") {
              return;
            }
            return (
              <div key={provider.name}>
                <button
                  className="bg-red-300 text-yellow-800 p-4 rounded-3xl"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    props: {
      providers: await providers(context),
      csrfToken: await csrfToken(context),
    },
  };
}
