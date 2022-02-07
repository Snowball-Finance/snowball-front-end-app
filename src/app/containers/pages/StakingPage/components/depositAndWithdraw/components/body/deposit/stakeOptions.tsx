import { styled } from "@mui/material";
import { DepositUnlockPeriod } from "app/containers/pages/StakingPage/types";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { CssVariables } from "styles/cssVariables/cssVariables";

const options = (t: any) => [
  {
    label: t(translations.Staking.UnlockTokensDaily()),
    value: DepositUnlockPeriod.daily,
  },
  {
    label: t(translations.Staking.UnlockTokensAtTheEndOfTheLockingPeriod()),
    value: DepositUnlockPeriod.end,
  },
];

export const StakeOptions = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Title>{t(translations.Staking.StakeOptions())}</Title>
      {options(t).map((option, index) => (
        <>{option.label}</>
      ))}
    </Wrapper>
  );
};

const Title = styled("h6")({
  fontSize: "16px",
  fontWeight: "400",
  margin: 0,
  color: CssVariables.darkText,
});

const Wrapper = styled("div")({});
