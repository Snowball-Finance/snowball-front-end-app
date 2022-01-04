import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoadingReceipt, selectReceipt } from "../../../selectors";
import { GovernanceActions } from "../../../slice";
import { Proposal } from "../../../types";

interface Props{
  proposal:Proposal
}

export const VoteStatus:FC<Props>=({proposal})=>{
  const dispatch=useDispatch()
  const isLoading=useSelector(selectIsLoadingReceipt)
  const receipt=useSelector(selectReceipt)
  useEffect(() => {
    dispatch(GovernanceActions.setVotingReceipt(undefined))
    dispatch(GovernanceActions.getVotingReceipt({proposal}))
    return () => {
    }
  }, [])

  const isFor = receipt?.support || false
  const hasVoted = receipt?.hasVoted || false

return (
  <></>
)
}

// const VoteHistory = ({
//   proposal,
//   proposalReceipt
// }) => {
//   const isFor = proposalReceipt?.support || false
//   const hasVoted = proposalReceipt?.hasVoted || false
//   const classes = useStyles({ isFor, hasVoted })
//   const { voteProposal } = useVoteContract();

//   return (
//     <Card className={classes.root}>
//       <Typography variant='body1' className={classes.label}>
//         {hasVoted ? 
//         `You voted ${isFor ? 'For' : 'Against'} with ${formatNumber(proposalReceipt?.votes || 0, 4)} xSNOB`
//         : proposal.state === 'Active' ? 
//         "You haven't voted on this proposal yet" 
//         : "You didn't vote on this proposal"
//         }
//         {hasVoted ? isFor ? <VoteForIcon /> : <VoteAgainstIcon /> : null}
//       </Typography>
//       {(proposal.state === 'Active' && hasVoted) && 
//         <ContainedButton
//           className={classes.subHeaderButton}
//           size='small'
//           disableElevation
//           onClick={() => voteProposal(proposal, !isFor)}
//         >
//           Switch Vote
//         </ContainedButton>
//       }
//     </Card>
//   )
// }