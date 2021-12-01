
import { styled } from "@mui/material"
import { selectContracts } from "app/containers/BlockChain/selectors"
import { useSelector } from "react-redux"

export const SnobBalance = () => {
  const { snob, snowCone } = useSelector(selectContracts)



  return (
    <Wrapper>

    </Wrapper>
  )
}

const Wrapper = styled('div')({

})