import Button from "../Button";
import { useWeb3 } from "@3rdweb/hooks";

const ConnectWallet = ({}) => {
  const { connectWallet, error } = useWeb3();

  if (error && error.name === "UnsupportedChainIdError") {
    return (
      <div className="unsupported-network">
        <h2 className="golden-text">Please, connect to Rinkeby</h2>
        <p>
          This dapp only works on the Rinkeby network, please switch networks in
          your connected wallet.
        </p>
        <Button />
      </div>
    );
  }
  return (
    <Button onClick={() => connectWallet("injected")}>Connect Wallet</Button>
  );
};

export default ConnectWallet;
