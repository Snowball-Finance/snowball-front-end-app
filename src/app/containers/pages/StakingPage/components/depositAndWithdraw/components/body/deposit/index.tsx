import { styled } from "@mui/material";
import { env } from "environment";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { Balance } from "./balance";
import { LockPeriod } from "./lockPeriod";
import { BalanceSlider } from "./slider";
import { StakeOptions } from "./stakeOptions";
import { StakingAmount } from "./stakingAmount";

export const Deposit = () => {
  const { t } = useTranslation();
  const mainToken = env.MAIN_TOKEN_NAME;
  return (
    <Wrapper>
      <Title>
        {t(translations.Staking.Stake())} {mainToken}
      </Title>
      <BalanceAndAmountWrapper>
        <Balance />
        <StakingAmount />
      </BalanceAndAmountWrapper>
      <LockPeriod />
      <BalanceSlider />
      <StakeOptions />
    </Wrapper>
  );
};

const BalanceAndAmountWrapper = styled("div")({});
const Title = styled("h6")({
  fontSize: "24px",
  fontWeight: "600",
  color: CssVariables.darkText,
  margin: 0,
  marginTop: "16px",
});
const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});
