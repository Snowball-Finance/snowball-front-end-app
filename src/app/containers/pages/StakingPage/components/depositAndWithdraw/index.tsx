import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { StakingTabs } from "./components/tabs";

export const DepositAndWithdraw = () => {
  return (
    <StyledSnowPaper>
      <StakingTabs />
    </StyledSnowPaper>
  );
};

const StyledSnowPaper = styled(SnowPaper)({
  padding: "24px 32px",
  position: "relative",
  maxWidth: "490px",
});
