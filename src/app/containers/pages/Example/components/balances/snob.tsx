import { CircularProgress, styled } from "@mui/material";
import {
  selectIsLoadingSnobBalance,
  selectMainTokenBalance,
} from "app/containers/BlockChain/selectors";
import { FC } from "react";
import { useSelector } from "react-redux";
import { BNToFloat } from "common/format";
import { env } from "environment";

export const SnobBalance: FC = () => {
  const isLoading = useSelector(selectIsLoadingSnobBalance);
  const balance = useSelector(selectMainTokenBalance);
  const mainTokenName = env.MAIN_TOKEN_NAME;

  return (
    <Wrapper>
      <h5>
        {mainTokenName?.toUpperCase()}:{" "}
        {isLoading ? <CircularProgress /> : balance ? BNToFloat(balance) : "-"}
      </h5>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  background: "magenta",
});
