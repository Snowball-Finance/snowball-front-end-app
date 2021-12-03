import { useEffect } from "react"
import { ExampleActions } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoadingPools, selectIsReadyToGetUserData, selectPoolsToShow } from "../selectors";
import { selectPrivateProvider } from "app/containers/BlockChain/Ethers/selectors";
import { PoolsList } from "./poolsList";


export const Pools = () => {
  const dispatch = useDispatch();

  const pools = useSelector(selectPoolsToShow)
  const isLoading = useSelector(selectIsLoadingPools)
  const provider = useSelector(selectPrivateProvider)
  const isReadyToGetUserPools = useSelector(selectIsReadyToGetUserData)

  useEffect(() => {
    if (isReadyToGetUserPools) {
      dispatch(ExampleActions.getAndSetUserPools())
    }
    return () => {

    }
  }, [isReadyToGetUserPools])

  useEffect(() => {
    if (provider) {
      dispatch(ExampleActions.getLastSnowballInfo())
    }
  }, [provider])

  return (
    <PoolsList isLoading={isLoading} pools={pools} />
  )

}
