import { useWeb3 } from "@3rdweb/hooks";

import { useState, useEffect } from "react";
import Button from "../Button";
import { Coin, Container } from "./styles";
import { bundleDropModule, sdk } from "../../thirdweb-modules";

const MembershipNFT = () => {
  const { address, provider } = useWeb3();
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const signer = provider ? provider.getSigner() : undefined;

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  const mintNFT = () => {
    setIsClaiming(true);

    bundleDropModule
      .claim("0", 1)
      .then(() => {
        setHasClaimedNFT(true);
        console.log(
          `🌊 Successfully claimed NFT! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
        );
      })
      .catch((e) => {
        console.error("Something went wrong while claiming NFT", e);
      })
      .finally(() => {
        setIsClaiming(false);
      });
  };

  if (hasClaimedNFT) {
    return (
      <Container>
        <Coin src="/assets/valar_dohaeris.png" />
        {/* <Button onClick={() => setIsClaiming(true)}></Button>; */}
        <span className="underline">
          Now you have access!
          <br />
          Click to continue
        </span>
      </Container>
    );
  }

  return (
    <Container>
      <Coin src="/assets/valar_dohaeris_back.png" />
      <Button onClick={mintNFT}>Valar morghulis</Button>
      <span>{isClaiming ? "Claiming..." : "Claim NFT"}</span>
    </Container>
  );
};

export default MembershipNFT;
