import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectProposals } from "../../../selectors"
import { GovernanceActions } from "../../../slice"

export const ProposalsList = memo(() => {
  const dispatch = useDispatch()
  const proposals = useSelector(selectProposals)
  useEffect(() => {
    dispatch(GovernanceActions.getProposals({ silent: proposals.length !== 0 }))
    return () => {
    }
  }, [])
  return (
    <>
      {proposals.length}
    </>
  )
},()=>true)