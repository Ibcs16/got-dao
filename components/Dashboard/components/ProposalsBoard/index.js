import { useCallback, useEffect, useState } from "react";
import { voteModule, sdk, tokenModule } from "../../../../thirdweb-modules";
import Board from "../Board";

import { ethers } from "ethers";
import { useWeb3 } from "@3rdweb/hooks";
import Radio from "../../../Radio";
import ProposalItem from "../ProposalItem";
import VoteButton from "../../../VoteButton";

const ProposalsBoard = () => {
  const { address, provider } = useWeb3();
  const [proposals, setProposals] = useState([]);

  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const signer = provider ? provider.getSigner() : undefined;

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    if (!proposals.length) {
      return;
    }

    voteModule
      .hasVoted(proposals[0].proposalId, address)
      .then((hasVotedF) => {
        setHasVoted(hasVotedF);
        if (hasVotedF) {
          console.log("🥵 User has already voted");
        }
      })
      .catch((err) => {
        console.error("failed to check if wallet has voted", err);
      });
  }, [proposals, address]);

  useEffect(() => {
    voteModule
      .getAll()
      .then((proposals) => {
        setProposals(proposals);
        console.log("🌈 Proposals:", proposals);
      })
      .catch((err) => {
        console.error("failed to get proposals", err);
      });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      //before we do async things, we want to disable the button to prevent double clicks
      setIsVoting(true);

      // lets get the votes from the form for the values
      const votes = proposals.map((proposal) => {
        let voteResult = {
          proposalId: proposal.proposalId,
          //abstain by default
          vote: 2,
        };
        proposal.votes.forEach((vote) => {
          const elem = document.getElementById(
            proposal.proposalId + "-" + vote.type
          );

          if (elem.checked) {
            voteResult.vote = vote.type;
            return;
          }
        });
        return voteResult;
      });

      // first we need to make sure the user delegates their token to vote
      try {
        //we'll check if the wallet still needs to delegate their tokens before they can vote
        const delegation = await tokenModule.getDelegationOf(address);
        // if the delegation is the 0x0 address that means they have not delegated their governance tokens yet
        if (delegation === ethers.constants.AddressZero) {
          //if they haven't delegated their tokens yet, we'll have them delegate them before voting
          await tokenModule.delegateTo(address);
        }
        // then we need to vote on the proposals
        try {
          await Promise.all(
            votes.map(async (vote) => {
              // before voting we first need to check whether the proposal is open for voting
              // we first need to get the latest state of the proposal
              const proposal = await voteModule.get(vote.proposalId);
              // then we check if the proposal is open for voting (state === 1 means it is open)
              if (proposal.state === 1) {
                // if it is open for voting, we'll vote on it
                return voteModule.vote(vote.proposalId, vote.vote);
              }
              // if the proposal is not open for voting we just return nothing, letting us continue
              return;
            })
          );
          try {
            // if any of the propsals are ready to be executed we'll need to execute them
            // a proposal is ready to be executed if it is in state 4
            await Promise.all(
              votes.map(async (vote) => {
                // we'll first get the latest state of the proposal again, since we may have just voted before
                const proposal = await voteModule.get(vote.proposalId);

                //if the state is in state 4 (meaning that it is ready to be executed), we'll execute the proposal
                if (proposal.state === 4) {
                  return voteModule.execute(vote.proposalId);
                }
              })
            );
            // if we get here that means we successfully voted, so let's set the "hasVoted" state to true
            setHasVoted(true);
            // and log out a success message
            console.log("successfully voted");
          } catch (err) {
            console.error("failed to execute votes", err);
          }
        } catch (err) {
          console.error("failed to vote", err);
        }
      } catch (err) {
        console.error("failed to delegate tokens");
      } finally {
        // in *either* case we need to set the isVoting state to false to enable the button again
        setIsVoting(false);
      }
    },
    [proposals, address]
  );

  return (
    <Board title="Proposals">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <ul>
          {proposals.map((proposal) => (
            <ProposalItem {...proposal} key={proposal.proposalId} />
          ))}
        </ul>
        <VoteButton type="submit" disabled={hasVoted}>
          {!hasVoted ? (isVoting ? "Voting..." : "Send Votes") : "Voted"}
        </VoteButton>
      </form>
    </Board>
  );
};

export default ProposalsBoard;
