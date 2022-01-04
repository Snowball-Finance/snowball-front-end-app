import { InputAdornment, styled, TextField } from "@mui/material"
import { SnowPaper } from "app/components/base/SnowPaper"
import { VotePower } from "app/containers/pages/Governance/components/votePower"
import { env } from "environment"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables"
import { selectNewProposalFields, selectSelectedProposal } from "../../../selectors"
import { GovernanceActions } from "../../../slice"
import { ContainerState } from "../../../types"

const isInvalidPeriod=(value:string)=>{
  return value===''||value.includes('e')||value.includes('.')||Number(value)>Number(env.MAXIMUM_VOTING_PERIOD)||Number(value)<Number(env.MINIMUM_VOTING_PERIOD)
}

export const RightSection = () => {
  const { t } = useTranslation()
  const proposal = useSelector(selectSelectedProposal)

  const proposer = proposal?.proposer

  const dispatch = useDispatch()
  const censoredProposer = proposer ?
    proposer.substring(0, 6) + "***" + proposer.substring(proposer.length - 4, proposer.length) :
    t(translations.Common.ProposalNotFound())

  const handleInputChange = (value: string, field: keyof ContainerState['newProposalFields']) => {
    if(field==='votingPeriod'){
      if(isInvalidPeriod(value)){
        return
      }
    }
    dispatch(GovernanceActions.setNewProposalFields({ key: field, value }))
  }

  const proposalFields = useSelector(selectNewProposalFields)
  const { discussion, document, votingPeriod } = proposalFields

  return (
    <Wrapper>
      <VotePower />
      <RightSnowPaper>
        <ProposerWrapper>
          <TopTitle>
            {t(translations.GovernancePage.Proposedby())}
          </TopTitle>
          <Account>
            {censoredProposer}
          </Account>
        </ProposerWrapper>
        <InputTitle>
          {t(translations.GovernancePage.VotingPeriod())}
          <span> *</span>
        </InputTitle>
        <TextField
          margin="dense"
          size="small"
          onChange={({ target }) => handleInputChange(target.value, 'votingPeriod')}
          value={votingPeriod}
          fullWidth
          type='number'
          placeholder={t(translations.GovernancePage.PeriodInDaysToVote())}
          InputProps={{
            inputProps:{
              min:env.MINIMUM_VOTING_PERIOD,
              max:env.MAXIMUM_VOTING_PERIOD
            },
            endAdornment: (
              <InputAdornment position="end">
                {env.MINIMUM_VOTING_PERIOD_UNIT}
              </InputAdornment>
            )
          }}
          inputProps={{
            min: Number(env.MINIMUM_VOTING_PERIOD),
            max: Number(env.MAXIMUM_VOTING_PERIOD)
          }}
        />
        <InputTitle>
          {t(translations.GovernancePage.DiscussionURL())}
        </InputTitle>
        <TextField
          margin="dense"
          size="small"

          fullWidth
          onChange={({ target }) => handleInputChange(target.value, 'discussion')}
          value={discussion}
          placeholder='https://discord.com/channels/...'
        />
        <InputTitle>
          {t(translations.GovernancePage.ProsConsDocumentURL())}
        </InputTitle>
        <TextField
          margin="dense"
          size="small"
          onChange={({ target }) => handleInputChange(target.value, 'document')}
          value={document}
          fullWidth
          placeholder='https://docs.google.com/...'
        />
      </RightSnowPaper>
    </Wrapper>
  )
}

const InputTitle = styled('p')({
  fontSize: '16px',
  margin: 0,
  color: CssVariables.black,
  'span': {
    color: CssVariables.red
  }
})

const Account = styled('p')({
  fontSize: '12px',
  fontWeight: '500',
  margin: 0,
  color: CssVariables.black,
})

const TopTitle = styled('p')({
  fontSize: '16px',
  fontWeight: '500',
  margin: 0,
  color: CssVariables.black,
})

const ProposerWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px'
})

const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
})


const RightSnowPaper = styled(SnowPaper)({
  padding: '20px 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
})

const Wrapper = styled(Column)({
  '.MuiFormControl-root': {
    margin: 0
  }
})
