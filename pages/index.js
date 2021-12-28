import Head from "next/head";

import ConnectedAddress from "../components/ConnectedAddress";
import ConnectWallet from "../components/ConnectWallet";
import MembershipNFT from "../components/MembershipNFT";
import MainTitle from "../components/MainTitle";
import { useWeb3 } from "@3rdweb/hooks";
import Dashboard from "../components/Dashboard";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";

const sdk = new ThirdwebSDK("rinkeby");

const bundleDropModule = sdk.getBundleDropModule(
  "0xF8E4dC17FC89cEA8A70ba42Ed1301586e0052Abb"
);

export default function Home() {
  const { address } = useWeb3();
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  useEffect(() => {
    if (!address) {
      return;
    }

    bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        }
      })
      .catch((error) => {
        console.error("failed to get nft balance", error);
      });
  }, [address]);

  return (
    <div className="">
      <Head>
        <title>GOTDAO</title>
        <meta name="description" content="A DAO for GOT fans" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://got-dao.vercel.app/" />
        <meta property="og:title" content="GOTDAO - A Game of Thrones DAO" />
        <meta
          property="og:description"
          content="A DAO for Game of Thrones fans"
        />
        <meta property="og:image" content="/assets/og_twitter.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://got-dao.vercel.app/" />
        <meta
          property="twitter:title"
          content="GOTDAO - A Game of Thrones DAO"
        />
        <meta
          property="twitter:description"
          content="A DAO for Game of Thrones fans"
        />
        <meta property="twitter:image" content="/assets/og_twitter.png" />
        <link rel="icon" href="/assets/fav_dao.png" />
        <link
          rel="preload"
          href="/fonts/TrajanPro/TrajanPro-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/TrajanPro/TrajanPro-Bold.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>

      <main className={"w-full h-[100vh]  items-center grid lg:grid-cols-12"}>
        <div className="col-span-1" />
        <div className="col-span-4">
          <MainTitle />
        </div>
        <div className="col-span-1" />
        <div className="col-span-5 flex flex-col items-center gap-[70px] ">
          {!address && <ConnectWallet />}
          {!hasClaimedNFT && address && (
            <MembershipNFT setHasClaimedNFT={setHasClaimedNFT} />
          )}
          {hasClaimedNFT && address && <Dashboard />}
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}
