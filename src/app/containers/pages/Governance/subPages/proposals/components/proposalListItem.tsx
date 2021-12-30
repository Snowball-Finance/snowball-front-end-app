import { styled } from "@mui/material"
import { FC } from "react"
import { Proposal } from "../../../types"

interface ProposalListItemProps{
  proposal:Proposal
}

export const ProposalListItem:FC<ProposalListItemProps>=({proposal})=>{
  return <Wrapper>{proposal.state} </Wrapper>
}

const Wrapper=styled('div')({})