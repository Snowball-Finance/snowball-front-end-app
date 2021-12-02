/**
*
* Example
*
*/

import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useExampleSlice } from './slice';

import { Grid, styled } from "@mui/material";
import { AddSnowballToMetamaskButton } from "./components/addSnobToMetamaskButton";
import { GetAsyncDataButton } from "./components/getAsyncDataButton";
import { ConnectToWalletButton } from "./components/connetcToWalletButton";
import { Wallet } from "./components/wallet";
import { Balances } from "./components/balances";

interface Props { }


export function Example(props: Props) {
  useExampleSlice()

  return (
    <>
      <Helmet>
        <title>Example</title>
        <meta name="description" content="Description of Example" />
      </Helmet>
      <Wrapper>
        <Grid container p={5}>
          <Grid item xs={2}>
            <GetAsyncDataButton />
          </Grid>
          <Grid item xs={2}>
            <AddSnowballToMetamaskButton />
          </Grid>
          <Grid item xs={2}>
            <ConnectToWalletButton />
            <Wallet />
          </Grid>
          <Grid item xs={2}>
            <Balances />
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );

};



const Wrapper = styled('div')`


`