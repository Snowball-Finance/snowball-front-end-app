import { selectGauges, selectIsLoadingUserPoolsAndGauges } from "app/containers/PoolsAndGauges/selectors"
import { useSelector } from "react-redux"

export const SelectTokens = () => {
  const isLoadingGauges = useSelector(selectIsLoadingUserPoolsAndGauges)
  const gauges = useSelector(selectGauges)

  console.log({ gauges, isLoadingGauges })

  return <>select</>
}