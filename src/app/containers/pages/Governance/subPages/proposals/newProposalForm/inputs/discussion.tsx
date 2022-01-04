import { TextField } from "@mui/material"
import { selectNewProposalField } from "app/containers/pages/Governance/selectors"
import { GovernanceActions } from "app/containers/pages/Governance/slice"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

export const DiscussionInput = () => {
  const fieldName = 'discussion'
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const discussion = useSelector(selectNewProposalField(fieldName))

  const handleInputChange = (value: string) => {
    dispatch(GovernanceActions.setNewProposalFields({ key: fieldName, value }))
  }
  return (
    <TextField
      margin="dense"
      size="small"
      fullWidth
      onChange={({ target }) => handleInputChange(target.value)}
      value={discussion}
      placeholder='https://discord.com/channels/...'
    />
  )
}