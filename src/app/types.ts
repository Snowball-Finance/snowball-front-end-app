import { ethers } from 'ethers'

/* eslint-disable */
export enum AppPages {
  RootPage = '/',
  HomePage = '/home',
  Example = '/example',
  // [INSERT NEW PAGE PATH ABOVE] < Needed for generating containers seamlessly
}


export type PrivateProvider = ethers.providers.StaticJsonRpcProvider
export type Contract = ethers.Contract