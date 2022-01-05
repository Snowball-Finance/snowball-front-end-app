import { TextField } from "@mui/material"
import { selectNewProposalField } from "app/containers/Governance/selectors"
import { GovernanceActions } from "app/containers/Governance/slice"
import { useDispatch, useSelector } from "react-redux"

export const TitleInput = () => {
  const fieldName='title'
  const dispatch = useDispatch()
  const title = useSelector(selectNewProposalField(fieldName))

  const handleInputChange = (value: string) => {
    dispatch(GovernanceActions.setNewProposalFields({ key: fieldName, value }))
  }

  return (
    <TextField
      onChange={({ target }) => handleInputChange(target.value)}
      fullWidth
      variant="outlined"
      size="small"
      margin="dense"
      value={title}
    />
  )
}