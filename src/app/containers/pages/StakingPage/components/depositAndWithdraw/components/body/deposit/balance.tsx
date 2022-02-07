import { styled } from "@mui/material";
import { selectMainTokenBalance } from "app/containers/BlockChain/selectors";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const Balance = () => {
  const { t } = useTranslation();
  const mainTokenBalance = useSelector(selectMainTokenBalance);
  return (
    <BalanceText>
      {t(translations.Common.Balance())}: {mainTokenBalance?.toString()}
    </BalanceText>
  );
};

const BalanceText = styled("p")({
  fontSize: "14px",
  fontWeight: "400",
  color: CssVariables.darkText,
  margin: 0,
  textAlign: "end",
});
