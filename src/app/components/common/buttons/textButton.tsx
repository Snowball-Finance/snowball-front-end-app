import { styled } from "@mui/material";
import { SnowButtonProps, SnowButton } from "app/components/base/snowButton";
import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const TextButton: FC<SnowButtonProps> = (props) => {
  return <StyledButton variant='text' {...props} />
}

const StyledButton = styled(SnowButton)({
  "&.Mui-disabled":{
    color:CssVariables.grey
  }
})