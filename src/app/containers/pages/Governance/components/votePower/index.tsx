import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { FC } from "react";
import { useSelector } from "react-redux";
import xSnobBalanceBackground from "assets/images/vote-power.png";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";
import { selectAccount } from "app/containers/BlockChain/Web3/selectors";
import { mobile } from "styles/media";
import { env } from "environment";
import { selectGovernanceTokenBalance } from "app/containers/BlockChain/Governance/selectors";

export const VotePower: FC = () => {
  const governanceTokenBalance = useSelector(selectGovernanceTokenBalance)
  const account = useSelector(selectAccount)
  const { t } = useTranslation()
 const balance=(governanceTokenBalance && account)?governanceTokenBalance.toNumber():'0.000'
  return (
    <Wrapper elevation={0}>
      <LogoWrapper >
        <img src={env.GOVERNANCE_TOKEN_LOGO_ADDRESS} alt="" />
      </LogoWrapper>
      <ContentWrapper>
        <ContentTitle>
          {t(translations.GovernancePage.VotingPower())}
        </ContentTitle>
        <VotingTokenValue>
          <span>{balance}</span><Upper>{env.GOVERNANCE_TOKEN_NAME}</Upper>
        </VotingTokenValue>
      </ContentWrapper>
    </Wrapper>
  )
}


const Upper=styled('span')({
  textTransform:'uppercase',
})

const ContentTitle = styled('p')({
  fontSize: '0.875rem',
  color: CssVariables.white
})

const VotingTokenValue = styled('p')({
  fontSize: '24px',
  color: CssVariables.white,
  margin: 0,
  display: 'flex',
  gap: '6px'
})

const ContentWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  padding: '0px 20px',
})

const LogoWrapper = styled('div')({
  width: '62px',
  marginRight: '16px',
  'img': {
    maxWidth: '100%',
  },
  alignSelf: 'center'
})

const Wrapper = styled(SnowPaper)({
  backgroundImage: `url(${xSnobBalanceBackground})`,
  backgroundColor: CssVariables.primaryBlue,
  backgroundSize: 'cover',
  width: '345px',
  minHeight: '160px',
  display: 'flex',
  padding: '16px',
  [mobile]:{
    width:'100%'
  }
})