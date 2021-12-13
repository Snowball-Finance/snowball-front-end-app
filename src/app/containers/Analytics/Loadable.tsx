/**
*
* Asynchronously loads the component for Analytics
*
*/
import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { PageLoading } from 'app/components/common/pageLoading';

export const Analytics = lazyLoad(() => import('./index'), module => module.Analytics, {fallback: <PageLoading />,},);