import { TextField } from "@mui/material"
import { selectNewProposalField } from "app/containers/pages/Governance/selectors"
import { GovernanceActions } from "app/containers/pages/Governance/slice"
import { ContainerState } from "app/containers/pages/Governance/types"
import { useDispatch, useSelector } from "react-redux"


export const DescriptionInput = () => {
const fieldName='description'
  const dispatch = useDispatch()
  const description = useSelector(selectNewProposalField(fieldName))

  const handleInputChange = (value: string ) => {
    dispatch(GovernanceActions.setNewProposalFields({ key: fieldName, value }))
  }

  return (
    <TextField
      fullWidth
      variant="outlined"
      multiline rows={15}
      onChange={({ target }) => handleInputChange(target.value)}
      value={description}
    />
  )
}