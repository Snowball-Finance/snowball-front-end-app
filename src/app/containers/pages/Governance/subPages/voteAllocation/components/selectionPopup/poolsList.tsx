import { Checkbox, styled } from "@mui/material"
import { selectedPoolProviders, selectPoolProviders } from "app/containers/pages/Governance/selectors"
import { GovernancePageActions } from "app/containers/pages/Governance/slice"
import { GaugeItem } from "app/containers/PoolsAndGauges/types"
import { useDispatch, useSelector } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables"
import { SubListTitle } from "./styles"

export const PoolsList = () => {
  const dispatch = useDispatch()
  const providers = useSelector(selectPoolProviders)
  const selectedProviders = useSelector(selectedPoolProviders)

  let providersToShow = providers

  if (selectedProviders.length !== 0) {
    providersToShow = providers.filter((provider) => {
      return selectedProviders.includes(provider.name)
    })
  }

  const handleGaugeClick = (gauge: GaugeItem) => {
    dispatch(GovernancePageActions.toggleSelectedPair(gauge))
  }

  return (
    <Wrapper>
      {providersToShow.map((provider) => {
        return (
          <ProviderNameAndPoolsWrapper key={provider.name} >
            <SubListTitle>{provider.name}</SubListTitle>
            <ListWrapper>
              {provider.gauges.map((gauge) => {
                return (
                  <ItemWrapper
                    onClick={() => { handleGaugeClick(gauge) }}
                    key={gauge.address}
                  >
                    <span>
                      <Checkbox checked={gauge.selected} size="medium" />
                    </span>
                    <span>
                      {gauge.poolName.replace(' Pool', '')}
                    </span>
                  </ItemWrapper>)
              })}
            </ListWrapper>
          </ProviderNameAndPoolsWrapper>
        )
      })}
    </Wrapper>
  )
}

const ItemWrapper = styled('div')({
  color: CssVariables.darkText,
  fontSize: '14px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  cursor:'pointer'
})

const ListWrapper = styled('div')({})

const ProviderNameAndPoolsWrapper = styled('div')({})

const Wrapper = styled('div')({
  maxHeight: '330px',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
})