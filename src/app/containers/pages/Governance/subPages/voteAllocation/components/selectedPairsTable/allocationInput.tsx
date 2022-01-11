import { styled } from "@mui/material";
import { selectSelectedVoteAllocationPair } from "app/containers/pages/Governance/selectors";
import { GovernancePageActions } from "app/containers/pages/Governance/slice";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const AllocationInput = ({ data }: { data: GaugeItem }) => {
  const pair = useSelector(selectSelectedVoteAllocationPair(data.address))
  const dispatch = useDispatch()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const newPair = { ...pair, enteredAllocation: value ? Number(value) : 0 }
    if (value.includes('e')) {
      return
    }
    dispatch(GovernancePageActions.setSelectedPairAllocationInputValue(newPair))
  }

  return (
    <Wrapper>
      <input type='number' value={pair?.enteredAllocation??''} onChange={handleInputChange} />
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  'input': {
    maxWidth: '100px',
    height: '30px',
    outline: 'none',
    borderRadius: '8px',
    border: `1px solid ${CssVariables.gridInputBorder}`,
    padding: '0px 5px',
  }
})