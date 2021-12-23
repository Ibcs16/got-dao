import { useWeb3 } from "@3rdweb/hooks";

import { useEffect, useState } from "react";
import { Coin, Address } from "./styles";

import { bundleDropModule } from "../../thirdweb-modules";

const ConnectedAddress = () => {
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const { address } = useWeb3();

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

  if (!address || !hasClaimedNFT) return null;
  return (
    <div className="flex gap-[20px] items-end absolute right-6 bottom-6">
      <Address>{address?.substr(0, 8).padEnd(12, ".")}</Address>
      <Coin src="/assets/valar_dohaeris.png" />
    </div>
  );
};

export default ConnectedAddress;
