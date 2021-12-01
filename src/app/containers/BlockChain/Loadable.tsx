/**
*
* Asynchronously loads the component for BlockChain
*
*/
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const BlockChain = lazyLoad(() => import('./index'), module => module.BlockChain, { fallback: <></>, },);