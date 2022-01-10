import { styled } from "@mui/material"
import { SnowPaper } from "app/components/base/SnowPaper"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { PoolProviders } from "./poolProviders"
import { PoolsList } from "./poolsList"
import { PairSelectionSearchInput } from "./search"

export const SelectionPopup=()=>{
  const {t}=useTranslation()
  const dispatch=useDispatch()
  return (
    <Wrapper>
      <PairSelectionSearchInput />
      <PoolProviders />
      <PoolsList />
    </Wrapper>
  )
}

const Wrapper = styled(SnowPaper)({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  width: '100%',
  zIndex: 1,
  right: 0,
  padding: '16px 12px',
})