/**
*
* Example
*
*/

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useExampleSlice } from './slice';

import { styled } from "@mui/material";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { translations } from "locales/i18n";

interface Props { }


export function Example(props: Props) {
  useExampleSlice()
  const { t } = useTranslation();


  return (
    <>
      <Helmet>
        <title>Example</title>
        <meta name="description" content="Description of Example" />
      </Helmet>
      <Wrapper>
        <ContainedButton color="primary" >
          {t(translations.ExamplePage.GetAsyncData())}
        </ContainedButton>
      </Wrapper>
    </>
  );

};

const Wrapper = styled('div')`


`