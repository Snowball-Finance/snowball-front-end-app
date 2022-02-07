import { styled } from "@mui/material";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const StakingAmount = () => {
  return <Wrapper></Wrapper>;
};
const Wrapper = styled("div")({
  padding: "16px 18px",
  borderRadius: CssVariables.paperBorderRadius,
  border: `1px solid ${CssVariables.ctaBlue}`,
});
