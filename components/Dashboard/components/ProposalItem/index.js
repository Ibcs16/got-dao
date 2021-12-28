import { useState } from "react";
import Radio from "../../../Radio";
import { Description } from "./styles";

const ProposalItem = ({ proposalId, votes, description }) => {
  console.log(votes);
  const [selectedOption, setSelectedOption] = useState(-1);
  const handleOnChange = (e) => {
    console.log(e.target.value);
    setSelectedOption(e.target.value);
  };
  return (
    <li className="mb-[36px]" key={proposalId}>
      <Description className="block mb-[44px]">{description}</Description>
      <div className="flex justify-between">
        {votes.map((vote, index) => (
          <Radio
            key={vote.type}
            type="radio"
            id={proposalId + "-" + vote.type}
            name={proposalId}
            value={vote.type}
            checked={vote.type == selectedOption}
            defaultChecked={vote.type == 2}
            label={vote.label}
            htmlFor={proposalId + "-" + vote.type}
            onChange={handleOnChange}
          />
        ))}
      </div>
    </li>
  );
};

export default ProposalItem;
