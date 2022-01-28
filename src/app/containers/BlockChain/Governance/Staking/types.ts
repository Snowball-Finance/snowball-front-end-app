/* --- STATE --- */
export interface StakingState {
  isStaking: boolean;
}

export interface CreateLockData {
  balance: string;
  date: string;
  duration: string;
}

export type ContainerState = StakingState;
