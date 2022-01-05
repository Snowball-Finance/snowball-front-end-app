import { CircularProgress, styled } from "@mui/material";
import { selectIsLoadingGovernanceTokenBalance, selectGovernanceTokenBalance } from "app/containers/BlockChain/selectors";
import { FC } from "react";
import { useSelector } from "react-redux";
import { BNToFloat } from "common/format";
import { env } from "environment";

export const XSnobBalance: FC = () => {
  const isLoading = useSelector(selectIsLoadingGovernanceTokenBalance)
  const balance = useSelector(selectGovernanceTokenBalance)

  return (
    <Wrapper>
      <h5>{env.GOVERNANCE_TOKEN_NAME}: {isLoading ? <CircularProgress /> : balance ? BNToFloat(balance) : '-'}</h5>
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  background: 'green',
})