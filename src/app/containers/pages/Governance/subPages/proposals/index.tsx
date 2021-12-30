import { translations } from "locales/i18n"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import hand from 'assets/images/vote-hand.png'
import { styled } from "@mui/material"
import { Max1040 } from "app/components/wrappers/max1040"
import { VotePower } from "../../components/votePower"
import {  InfoButtonProps } from "app/components/common/buttons/infoButton"
import InfoIcon from "assets/images/iconComponents/info"
import DiscordIcon from "assets/images/iconComponents/discord"
import { TopInfoCard } from "../../components/topInfoCard"
import { ProposalsTop } from "./components/proposalsTop"
import { ProposalsList } from "./components/proposalsList"

export const Proposals: FC= () => {
  const { t } = useTranslation()

const actionButtons:InfoButtonProps[]=[
  {
    icon:<InfoIcon  />,
    title:t(translations.Common.MoreInfo()),
    onClick:()=>{}
  },
  {
    icon:<DiscordIcon  />,
    title:t(translations.External.Discord()),
    onClick:()=>{}
  },
]

  return (
    <Max1040 m="auto" mt={2}>
      <Header>
        <TopInfoCard
          title={t(translations.GovernancePage.ActiveProposals())}
          desc={t(translations.GovernancePage.ActiveProposalsDescriptions())}
          endImage={hand}
          actionButtons={actionButtons}
        />
        <VotePower />
      </Header>
      <ProposalsTop />
      <ProposalsList />
    </Max1040>
  )
}

const Header = styled('div')({
  display: 'flex',
  gap:'6px'
})