import { selectSelectedWithdrawAndDepositTab } from "app/containers/pages/StakingPage/selectors";
import { DepositAndWithdrawTab } from "app/containers/pages/StakingPage/types";
import { useSelector } from "react-redux";

export const StakingTabs = () => {
  const selectedTab: DepositAndWithdrawTab = useSelector(
    selectSelectedWithdrawAndDepositTab
  );
  return <></>;
};
