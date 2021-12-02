import { CircularProgress, styled, Typography } from "@mui/material";
import { selectIsLoadingSnowConeBalance, selectSnowConeBalance } from "app/containers/BlockChain/selectors";
import { FC } from "react";
import { useSelector } from "react-redux";
import { BNToFloat } from "utils/format";

export const XSnobBalance: FC = () => {
  const isLoading = useSelector(selectIsLoadingSnowConeBalance)
  const balance = useSelector(selectSnowConeBalance)


  return (
    <Wrapper>
      {isLoading ? <CircularProgress /> : <Typography variant="h5">{BNToFloat(balance)}</Typography>}
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  background: 'green',
})