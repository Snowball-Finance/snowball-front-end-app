import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectGovernanceTokenContract } from "./selectors"
import { GovernanceActions, useGovernanceSlice } from "./slice"

export const Governance=({governanceTokenABI}:{governanceTokenABI:any})=>{
  useGovernanceSlice()
  const dispatch = useDispatch()
  const governanceToken=useSelector(selectGovernanceTokenContract)
  
  useEffect(() => {
    if (governanceToken) {
      dispatch(GovernanceActions.setGovernanceTokenContract( governanceToken))
    }
  }, [governanceToken])
  
  useEffect(() => {
    dispatch(GovernanceActions.setGovernanceTokenABI(governanceTokenABI))
    dispatch(GovernanceActions.getProposals({}))
    return () => {
    }
  }, [])

  return <></>
}