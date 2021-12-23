import { useCallback, useMemo, useState } from "react";
import ConnectedAddress from "../ConnectedAddress";
import MainTitle from "../MainTitle";
import MembersBoard from "./components/MembersBoard";
import ProposalsBoard from "./components/ProposalsBoard";
import TabSelector from "./components/TabSelector";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("members");

  const handleTabChange = () => {
    setActiveTab((prev) => (prev === "members" ? "proposals" : "members"));
  };

  const { tabName, arrowPosition, flexDirection } = useMemo(
    () => ({
      tabName: activeTab === "members" ? "Proposals" : "Members",
      arrowPosition: activeTab === "members" ? "right" : "left",
      flexDirection: activeTab === "members" ? "" : "flex-row-reverse",
    }),
    [activeTab]
  );

  const ActiveTab = activeTab === "members" ? MembersBoard : ProposalsBoard;

  return (
    <>
      <div className={`flex gap-[60px] items-center ${flexDirection}`}>
        <ActiveTab />
        <TabSelector
          tabName={tabName}
          arrowPosition={arrowPosition}
          onClick={handleTabChange}
        />
      </div>
      <ConnectedAddress />
    </>
  );
};

export default Dashboard;
