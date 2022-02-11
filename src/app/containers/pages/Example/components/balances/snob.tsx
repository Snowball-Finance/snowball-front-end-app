import { CircularProgress, styled } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";
import { BNToFloat } from "common/format";
import { env } from "environment";
import { BlockChainSelectors } from "app/containers/BlockChain/selectors";

export const SnobBalance: FC = () => {
  const isLoading = useSelector(BlockChainSelectors.selectIsLoadingSnobBalance);
  const balance = useSelector(BlockChainSelectors.selectMainTokenBalance);
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
