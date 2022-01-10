import { styled } from "@mui/material"
import { selectIsVoteAllocationSelectionOpen } from "app/containers/pages/Governance/selectors"
import { useDispatch, useSelector } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables"
import { GovernancePageActions } from "app/containers/pages/Governance/slice"
import { SelectionPopup } from "../selectionPopup"
import { SelectedPairs } from "./selectedPairs"

export const SelectPairs = () => {
  const dispatch = useDispatch()
  const isSelectionPopupOpen = useSelector(selectIsVoteAllocationSelectionOpen)

  const handleSelectionClick = () => {
    if (!isSelectionPopupOpen) {
      dispatch(GovernancePageActions.setIsVoteAllocationSelectionOpen(true))
    }
  }

  return (
    <Wrapper onClick={handleSelectionClick}>
      <SelectButtonWrapper>
        <SelectedPairs />
      </SelectButtonWrapper>
      {
        isSelectionPopupOpen &&
        <SelectionPopup />
        }
    </Wrapper>
  )
}

const SelectButtonWrapper = styled('div')({
  width: '100%',
})




const Wrapper = styled('div')({
  position: 'relative',
  width: '100%',
  minHeight: '48px',
  padding: '8px 12px',
  backgroundColor: CssVariables.white,
  border: '1px solid ' + CssVariables.lightGrey,
  borderRadius: CssVariables.paperBorderRadius,
})