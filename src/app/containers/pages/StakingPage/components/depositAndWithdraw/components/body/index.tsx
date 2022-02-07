import { styled } from "@mui/material";
import { StakingPageSelectors } from "app/containers/pages/StakingPage/selectors";
import { DepositAndWithdrawTab } from "app/containers/pages/StakingPage/types";
import { useSelector } from "react-redux";
import { Deposit } from "./deposit";
import { Withdraw } from "./withdraw";

export const DepositAndWithdrawBody = () => {
  const selectedTab: DepositAndWithdrawTab = useSelector(
    StakingPageSelectors.selectSelectedWithdrawAndDepositTab
  );
  return (
    <Wrapper>
      {selectedTab === DepositAndWithdrawTab.Deposit && <Deposit />}
      {selectedTab === DepositAndWithdrawTab.Withdraw && <Withdraw />}
    </Wrapper>
  );
};

const Wrapper = styled("div")({});
