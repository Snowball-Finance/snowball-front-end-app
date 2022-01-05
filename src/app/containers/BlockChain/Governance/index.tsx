import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectGovernanceTokenContract } from "./selectors"
import { GovernanceActions, useGovernanceSlice } from "./slice"

export const Governance=({tokenABI}:{tokenABI:any})=>{

const variables={
  MINIMUM_TOKEN_FOR_VOTING:process.env.REACT_APP_MINIMUM_TOKEN_FOR_VOTING,
  MINIMUM_VOTING_PERIOD:process.env.REACT_APP_MINIMUM_VOTING_PERIOD,
  MAXIMUM_VOTING_PERIOD:process.env.REACT_APP_MAXIMUM_VOTING_PERIOD,
  MINIMUM_VOTING_PERIOD_UNIT:process.env.REACT_APP_MINIMUM_VOTING_PERIOD_UNIT,
  GOVERNANCE_INFO_LINK:process.env.REACT_APP_GOVERNANCE_INFO_LINK,
  GOVERNANCE_TOKEN_NAME:process.env.REACT_APP_GOVERNANCE_TOKEN_NAME,
  GOVERNANCE_TOKEN_CONTRACT_ADDRESS:process.env.REACT_APP_GOVERNANCE_TOKEN_CONTRACT_ADDRESS,
  GOVERNANCE_TOKEN_LOGO_ADDRESS:process.env.REACT_APP_GOVERNANCE_TOKEN_LOGO_ADDRESS,
}

for(let key in variables){
  if(!variables[key]){
    throw new Error(`REACT_APP_${key} is not set in .env for the governance`)
  }
}


  useGovernanceSlice()
  const dispatch = useDispatch()
  const governanceToken=useSelector(selectGovernanceTokenContract)
  
  useEffect(() => {
    if (governanceToken) {
      dispatch(GovernanceActions.setGovernanceTokenContract( governanceToken))
    }
  }, [governanceToken])
  
  useEffect(() => {
    dispatch(GovernanceActions.setGovernanceTokenABI(tokenABI))
    dispatch(GovernanceActions.getProposals({}))
    return () => {
    }
  }, [])

  return <></>
}