import { styled } from "@mui/material";
import { env } from "environment";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const DepositYouWillGet = () => {
  const { t } = useTranslation();
  const governanceTokenName = env.GOVERNANCE_TOKEN_NAME;

  return (
    <Amount>
      {t(translations.Staking.YouWillGet_AMOUNT_TOKEN(), {
        token: governanceTokenName,
        amount: 0,
      })}
    </Amount>
  );
};

const Amount = styled("h6")({
  fontSize: "16px",
  fontWeight: "600",
  margin: 0,
  color: CssVariables.primaryBlue,
  textAlign: "center",
});
