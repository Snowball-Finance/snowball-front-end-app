import { ContainedButton } from "app/components/common/buttons/containedButton"
import { selectIsSubmittingNewProposal } from "app/containers/pages/Governance/selectors"
import { GovernanceActions } from "app/containers/pages/Governance/slice"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

export const NewProposalSubmitButton = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsSubmittingNewProposal)

  const handleSubmitButton = () => {
    dispatch(GovernanceActions.submitNewProposal())
  }

  return (
    <ContainedButton loading={isLoading} height={48} width={85} onClick={handleSubmitButton} >
      {t(translations.Common.Submit())}
    </ContainedButton>
  )
}