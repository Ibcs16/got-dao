import { ThirdwebSDK } from "@3rdweb/sdk";

export const sdk = new ThirdwebSDK("rinkeby");

export const bundleDropModule = sdk.getBundleDropModule(
  "0xF8E4dC17FC89cEA8A70ba42Ed1301586e0052Abb"
);

export const tokenModule = sdk.getTokenModule(
  "0x2a563C7eD2225839Db976C19b6D9c7d1D0dF60bD"
);

export const voteModule = sdk.getVoteModule(
  "0x6477A8407581fDeacf4eF21931167426A88A41b5"
);
