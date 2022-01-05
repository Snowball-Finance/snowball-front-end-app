import { ContainedButton } from "app/components/common/buttons/containedButton"
import { selectNewProposalFields, selectIsSubmittingNewProposal } from "app/containers/Governance/selectors"
import { GovernanceActions } from "app/containers/Governance/slice"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

export const NewProposalSubmitButton = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const fields = useSelector(selectNewProposalFields)
  const isLoading = useSelector(selectIsSubmittingNewProposal)

  const handleSubmitButton = () => {
    dispatch(GovernanceActions.submitNewProposal())
  }

  const { title, votingPeriod, description } = fields
  const disabled = !title || !votingPeriod || !description


  return (
    <ContainedButton
      loading={isLoading}
      disabled={disabled}
      height={48}
      width={85}
      onClick={handleSubmitButton}
    >
      {t(translations.Common.Submit())}
    </ContainedButton>
  )
}