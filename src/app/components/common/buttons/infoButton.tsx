import { Box, styled } from "@mui/material";
import { FC, ReactNode } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { ContainedButton } from "./containedButton";

export interface InfoButtonProps{
  title:string,
  icon:ReactNode,
  onClick?:()=>void
}
export const InfoButton:FC<InfoButtonProps>=({icon,title,onClick})=>{
  return (
    <StyledContainedButton disableElevation onClick={onClick}>
      {title}
      <Box>
        {icon}
      </Box>
      </StyledContainedButton>
  )
}

const StyledContainedButton=styled(ContainedButton)({
display: 'flex',
gap: '8px',
backgroundColor: CssVariables.mildBlue,
color: CssVariables.primaryBlue,
borderRadius:CssVariables.paperBorderRadius,
fontSize:'12px',
"&:hover":{
  color:CssVariables.white,
  "path":{
    stroke:CssVariables.white
  }
}
})