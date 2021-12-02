import { CircularProgress, styled, Typography } from "@mui/material";
import { selectIsLoadingSnobBalance, selectSnobBalance } from "app/containers/BlockChain/selectors";
import { FC } from "react";
import { useSelector } from "react-redux";
import { BNToFloat } from "utils/format";

export const SnobBalance: FC = () => {
  const isLoading = useSelector(selectIsLoadingSnobBalance)
  const balance = useSelector(selectSnobBalance)


  return (
    <Wrapper>
      {(isLoading) ? <CircularProgress /> : <Typography variant="h5">{BNToFloat(balance)}</Typography>}
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  background: 'blue',
})