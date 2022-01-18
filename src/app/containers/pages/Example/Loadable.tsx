/**
 *
 * Asynchronously loads the component for Example
 *
 */
import React from "react";
import { lazyLoad } from "common/loadable";
import { PageLoading } from "app/components/common/pageLoading";

export const Example = lazyLoad(
  () => import("./index"),
  (module) => module.Example,
  { fallback: <PageLoading /> }
);
