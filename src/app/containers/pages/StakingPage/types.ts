/* --- STATE --- */
export enum DepositAndWithdrawTab {
  Deposit = "deposit",
  Withdraw = "withdraw",
}
export interface StakingPageState {
  enteredMainTokenToStake: string;
  selectedEpoch: Date | undefined;
  selectedDepositAndWithdrawTab: DepositAndWithdrawTab;
}

export type ContainerState = StakingPageState;
