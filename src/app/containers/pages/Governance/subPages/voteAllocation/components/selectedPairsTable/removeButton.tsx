import { styled } from "@mui/material"
import { GovernancePageActions } from "app/containers/pages/Governance/slice"
import { GaugeItem } from "app/containers/PoolsAndGauges/types"
import { CrossInCircle } from "assets/images/iconComponents/crossInCircle"
import { useDispatch } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables"

export const RemoveButton = ({ data }: { data: GaugeItem }) => {
  const dispatch = useDispatch()
  console.log(data.address)

  const handleRemoveClick=()=>{
    dispatch(GovernancePageActions.toggleSelectedPair(data))
  }

  return (
    <Wrapper onClick={handleRemoveClick} >
      <CrossInCircle color={CssVariables.primaryBlue} />
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  width: '24px',
  height: '24px',
  cursor:'pointer'
})