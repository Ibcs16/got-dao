import { TabName, ArrowIcon } from "./styles";

const TabSelector = ({ tabName, arrowPosition, ...others }) => {
  const flexDirection = arrowPosition === "right" ? "" : "flex-row-reverse";
  return (
    <div
      {...others}
      className={`flex items-center gap-[8px] ${flexDirection} cursor-pointer`}
    >
      <TabName className="golden-text">{tabName}</TabName>
      <ArrowIcon
        src={`/assets/arrow_icon_${arrowPosition}.png`}
        flip={arrowPosition === "left"}
      />
    </div>
  );
};

export default TabSelector;
