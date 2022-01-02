import { ContainedButton } from "app/components/common/buttons/containedButton"
import { selectIsSubmittingNewProposal } from "app/containers/pages/Governance/selectors"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

export const NewProposalSubmitButton = () => {
  const { t } = useTranslation()

  const isLoading=useSelector(selectIsSubmittingNewProposal)

  return (
    <ContainedButton loading={isLoading} height={48} width={85}>
      {t(translations.Common.Submit())}
    </ContainedButton>
  )
}