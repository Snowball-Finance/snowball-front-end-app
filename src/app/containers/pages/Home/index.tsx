/**
 *
 * HomePage
 *
 */

import React from "react";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { HomePageReducer, sliceKey } from "./slice";
import { homePageSaga } from "./saga";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { AppPages } from "app/types";
import {
  selectIsStaking,
  selectReadyForStaking,
} from "app/containers/BlockChain/Governance/Staking/selectors";
import { WalletToggle } from "app/components/common/walletToggle";
import { StakingActions } from "app/containers/BlockChain/Governance/Staking/slice";
import { selectSyncedProposalsWithBlockChain } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";

export const HomePage = () => {
  useInjectReducer({ key: sliceKey, reducer: HomePageReducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  const dispatch = useDispatch();

  const handleNavigateClick = () => {
    dispatch(push(AppPages.GovernancePage));
  };

  const handleTestStakingClick = () => {
    dispatch(
      StakingActions.createLock({
        duration: "1200",
        date: new Date().toISOString(),
        balance: "0",
      })
    );
  };
  const readyForStaking = useSelector(selectReadyForStaking);
  const isStaking = useSelector(selectIsStaking);

  const synced = useSelector(selectSyncedProposalsWithBlockChain);
  const handleSetSyncProposals = () => {
    dispatch(GovernanceActions.setSyncedProposalsWithBlockchain(false));
  };

  return (
    <>
      <ContainedButton onClick={handleNavigateClick}>
        Go To Governance
      </ContainedButton>
      <WalletToggle />
      <ContainedButton loading={isStaking} onClick={handleSetSyncProposals}>
        Synced Proposals {synced.toString()}
      </ContainedButton>
      <ContainedButton
        loading={isStaking}
        disabled={!readyForStaking}
        onClick={handleTestStakingClick}
      >
        test Staking
      </ContainedButton>
    </>
  );
};
