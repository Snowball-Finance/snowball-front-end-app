import { useEffect } from "react"
import { ExampleActions } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, styled } from "@mui/material";
import { selectIsLoadingPools, selectPools } from "../selectors";


export const Pools = () => {

  const dispatch = useDispatch();

  const pools = useSelector(selectPools)
  const isLoading = useSelector(selectIsLoadingPools)

  useEffect(() => {
    dispatch(ExampleActions.getLastSnowballInfo())
  }, [])

  return (
    <Wrapper>
      {isLoading && <CircularProgress />}
      {pools.map(pool => {
        return (
          <Item key={pool.name}>
            <p>{pool.name}</p>
          </Item>
        )
      })}
    </Wrapper>
  )

}
const Item = styled('div')({
  fontsize: '12px',
})

const Wrapper = styled('div')({})