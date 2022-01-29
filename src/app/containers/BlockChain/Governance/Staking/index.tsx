/**
 *
 * Staking
 *
 */

import { env } from "environment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { StakingActions, useStakingSlice } from "./slice";

interface Props {
  feeDistributorABI: any;
}
export function Staking({ feeDistributorABI }: Props) {
  useStakingSlice();
  const dispatch = useDispatch();
  if (!env.FEE_DISTRIBUTOR_CONTRACT_ADDRESS) {
    throw new Error(
      "REACT_APP_FEE_DISTRIBUTOR_CONTRACT_ADDRESS is not set in .env for the staking"
    );
  }

  useEffect(() => {
    dispatch(StakingActions.setFeeDistributorABI(feeDistributorABI));
    return () => {};
  }, []);

  return <></>;
}
