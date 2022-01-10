import { styled } from "@mui/material"
import { selectIsVoteAllocationSelectionOpen, selectSelectedVoteAllocationPairsArray } from "app/containers/pages/Governance/selectors"
import { selectGauges, selectIsLoadingUserPoolsAndGauges } from "app/containers/PoolsAndGauges/selectors"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables"
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { GovernancePageActions } from "app/containers/pages/Governance/slice"
import { SelectionPopup } from "../selectionPopup"


export const SelectTokens = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isLoadingGauges = useSelector(selectIsLoadingUserPoolsAndGauges)
  const gauges = useSelector(selectGauges)
  const isSelectionPopupOpen = useSelector(selectIsVoteAllocationSelectionOpen)
  const selectedPairs = useSelector(selectSelectedVoteAllocationPairsArray)
  const noSelectedPair = selectedPairs.length === 0

  const handleSelectionClick = () => {
    if (!isSelectionPopupOpen) {
      dispatch(GovernancePageActions.setIsVoteAllocationSelectionOpen(true))
    }
  }

  return (
    <Wrapper onClick={handleSelectionClick}>
      <SelectButtonWrapper>
        {noSelectedPair
          ?
          <PlaceHolder >
            <span>{t(translations.GovernancePage.VoteAllocation.SelectYourTokens())}</span><span><ArrowDropDownRoundedIcon /></span>
          </PlaceHolder>
          :
          <>
            {selectedPairs.map(pair => {
              return <PairChip key={pair.address} >{pair.poolName}</PairChip>
            })}
          </>
        }
      </SelectButtonWrapper>
        <SelectionPopup />
    </Wrapper>
  )
}

const SelectButtonWrapper=styled('div')({
  width:'100%',
})

const PairChip = styled('div')({})

const PlaceHolder = styled('p')({
  cursor: 'pointer',
  color: CssVariables.placeholderColor,
  fontSize: '20px',
  margin: 0,
  display: 'flex',
  justifyContent: 'space-between'
})

const Wrapper = styled('div')({
  position: 'relative',
  width: '100%',
  minHeight: '42px',
  padding: '8px 12px',
  backgroundColor: CssVariables.white,
  border: '1px solid ' + CssVariables.lightGrey,
  borderRadius: CssVariables.paperBorderRadius,
})