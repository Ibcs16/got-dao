import { useEffect, useState } from "react";
import { bundleDropModule, tokenModule } from "../../../../thirdweb-modules";
import Board from "../Board";
import { ColTitle } from "../Board/styles";
import { ethers } from "ethers";

const MembersBoard = () => {
  const [membersBalance, setMembersBalance] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const addresses = await bundleDropModule.getAllClaimerAddresses("0");

        console.log("🚀 Members addresses", addresses);

        setMembersBalance(
          Object.fromEntries(addresses.map((addy) => [addy, 0]))
        );

        const tokenAmounts = await tokenModule.getAllHolderBalances();

        console.log(tokenAmounts, "TOKENS");

        setMembersBalance((prev) => {
          const updated = {};
          Object.keys(prev).forEach((addy) => {
            updated[addy] = ethers.utils.formatUnits(
              tokenAmounts[addy] || 0,
              18
            );
          });
          return updated;
        });
      } catch (err) {
        console.error("failed to get member list", err);
      }
    })();
  }, []);

  return (
    <Board title="Members" className="max-w-[486px]">
      <div className="flex justify-between mb-[40px]">
        <ColTitle className="golden-text">Address</ColTitle>
        <ColTitle className="golden-text">$DRAGON</ColTitle>
      </div>
      <ul>
        {Object.entries(membersBalance).map((member) => {
          return (
            <li className="flex justify-between mb-[32px]" key={member[0]}>
              <span className="golden-text">
                {member[0]?.substr(0, 8).padEnd(12, ".")}
              </span>
              <span className="golden-text">{member[1]}</span>
            </li>
          );
        })}
      </ul>
    </Board>
  );
};

export default MembersBoard;
