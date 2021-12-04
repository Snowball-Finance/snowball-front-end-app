import { useEffect } from "react"
import { ExampleActions } from "../../slice";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoadingPools, selectIsReadyToGetUserData, selectPoolsToShow } from "../../selectors";
import { selectPrivateProvider } from "app/containers/BlockChain/Ethers/selectors";
import { PoolsList } from "./poolsList";
import { SearchInput } from "./search";
import { styled } from "@mui/material";
import { PoolSelect } from "./poolSelect";
import { SortSelect } from "./sortSelect";


export const Pools = () => {
  const dispatch = useDispatch();



  return (
    <>
      <FiltersWrapper>
        <SearchInput />
        <PoolSelect />
        <SortSelect />
      </FiltersWrapper>
      <PoolsList />
    </>
  )

}

const FiltersWrapper = styled('div')({
  display: 'flex',
  gap: '12px',
  marginBottom: '12px'
})