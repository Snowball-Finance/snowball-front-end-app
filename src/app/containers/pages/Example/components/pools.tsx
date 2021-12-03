import { useEffect } from "react"
import { ExampleActions } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, styled } from "@mui/material";
import { selectIsLoadingPools, selectPoolsArray } from "../selectors";
import { selectAccount } from "app/containers/BlockChain/Web3/selectors";
import { selectPrivateProvider } from "app/containers/BlockChain/Ethers/selectors";


export const Pools = () => {
  const dispatch = useDispatch();

  const pools = useSelector(selectPoolsArray)
  const isLoading = useSelector(selectIsLoadingPools)
  const account = useSelector(selectAccount)
  const provider = useSelector(selectPrivateProvider)

  useEffect(() => {
    if (account && provider) {
      dispatch(ExampleActions.getLastSnowballInfo())
    }
  }, [account, provider])

  return (
    <Wrapper>
      {isLoading && <CircularProgress />}
      {pools.map(pool => {
        return (
          <Item key={pool.address}>
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