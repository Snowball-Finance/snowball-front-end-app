import { styled } from "@mui/material"
import { SnowSelect } from "app/components/base/SnowSelect"
import { useDispatch, useSelector } from "react-redux"
import { selectPoolOptions, selectSelectedPool } from "../../selectors"
import { ExampleActions } from "../../slice"

export const PoolSelect = () => {
  const options = useSelector(selectPoolOptions)
  const selectedPool = useSelector(selectSelectedPool)
  const dispatch = useDispatch()

  const handleSelectChange = (v: string) => {
    dispatch(ExampleActions.setSelectedPool(v))
  }

  return (
    <Wrapper>
      <SnowSelect
        options={options}
        onChange={handleSelectChange}
        selectedValue={selectedPool}
      />
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  width: '200px'
})