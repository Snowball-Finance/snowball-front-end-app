/**
*
* Example
*
*/

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { ExampleActions, useExampleSlice } from './slice';

import { Grid, styled } from "@mui/material";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { translations } from "locales/i18n";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAddingSnobToMetamask } from "./selectors";
import { AddSnowballToMetamaskButton } from "./components/addSnobToMetamaskButton";
import { GetAsyncDataButton } from "./components/getAsyncDataButton";

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
          <Grid item xs={1}>
            <GetAsyncDataButton />
          </Grid>
          <Grid item xs={1}>
            <AddSnowballToMetamaskButton />
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );

};

const Wrapper = styled('div')`


`