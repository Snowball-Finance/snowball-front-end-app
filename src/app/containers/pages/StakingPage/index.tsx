/**
 *
 * StakingPage
 *
 */

import React from "react";
import { useStakingPageSlice } from "./slice";
import { styled } from "@mui/material";
import { DepositAndWithdraw } from "./components/depositAndWithdraw";

interface Props {}
export function StakingPage(props: Props) {
  useStakingPageSlice();

  return (
    <Wrapper>
      <DepositAndWithdraw />
    </Wrapper>
  );
}

const Wrapper = styled("div")({});
