import { FC } from "react"
import { CssVariables } from "styles/cssVariables/cssVariables"
import { IconProps } from "./types"

const CrossIcon: FC<IconProps> = ({ color }) => {
  const fill = color ?? CssVariables.primaryBlue
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 8L8 24" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8L24 24" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default CrossIcon