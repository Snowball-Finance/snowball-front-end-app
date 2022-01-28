/**
 *
 * Staking
 *
 */

import React, { useEffect } from "react";
import { useStakingSlice } from "./slice";

interface Props {}
export function Staking(props: Props) {
  useStakingSlice();
  useEffect(() => {
    return () => {};
  }, []);

  return <></>;
}
