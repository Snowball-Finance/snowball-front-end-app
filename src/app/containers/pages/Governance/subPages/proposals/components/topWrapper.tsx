import { Divider, styled } from "@mui/material";
import { FC } from "react";
import { NewProposalButton } from "./newProposalButton";
import { ProposalFilterSelect } from "./filterSelect";
import { SubmitPermission } from "./submitPermission";

export const TopWrapper: FC = () => {
  return (
    <Wrapper>
      <SubmitPermission />
      <RightWrapper>
        <ProposalFilterSelect />
        <DividerWrapper>
          <Divider orientation="vertical" />
        </DividerWrapper>
        <NewProposalButton />
      </RightWrapper>
    </Wrapper>
  )
}

const DividerWrapper = styled('div')({
  padding: '4px'
})

const Wrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '16px'
})

const RightWrapper = styled('div')({
  display: 'flex',
})