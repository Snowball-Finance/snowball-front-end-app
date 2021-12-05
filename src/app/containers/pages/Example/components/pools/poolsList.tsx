import { styled } from "@mui/material"
import { ColDef, GridApi, GridReadyEvent, RowClickedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef } from "react";
import { PoolInfoItem } from "../../types";
import { IsGettingUserPoolsIndicator } from "./isGettingUserPoolsIndicator";
import { useDispatch, useSelector } from "react-redux";
import { selectGotUserPools, selectIsLoadingPools, selectIsReadyToGetUserData, selectPoolsToShow } from "../../selectors";
import { SnowPairsIcon } from "app/components/base/snowPairsIcon";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { ItemContainer, Left, PoolName, PoolNameAndProvider, PoolProvider, Right, StyledSnowPaper } from "./components";
import { selectPrivateProvider } from "app/containers/BlockChain/Ethers/selectors";
import { ExampleActions } from "../../slice";

interface GridConfigTypes {
  columnDefs: ColDef[];
  rowData: PoolInfoItem[];
}



const PoolRow = (params) => {
  const { data }: { data: PoolInfoItem } = params
  return (
    <StyledSnowPaper isopen={data.isDetailsOpen ? 'open' : ''}>
      <ItemContainer >
        <Left>
          <SnowPairsIcon
            addresses={[
              data.token0.address,
              data.token1?.address ?? '',
              data.token2?.address ?? '',
              data.token3?.address ?? '',
              data.token4?.address ?? ''
            ]} />
          <PoolNameAndProvider>
            <PoolName>{data.name}</PoolName>
            <PoolProvider name={data.source}>{data.source}</PoolProvider>
          </PoolNameAndProvider>
        </Left>
        <Right>
          <ContainedButton color="primary" >
            Do Something
          </ContainedButton>
        </Right>
      </ItemContainer>
    </StyledSnowPaper>
  );

}




export const PoolsList = () => {
  const dispatch = useDispatch()

  const pools = useSelector(selectPoolsToShow)

  const provider = useSelector(selectPrivateProvider)
  const isReadyToGetUserPools = useSelector(selectIsReadyToGetUserData)
  const alreadyGotUserPools = useSelector(selectGotUserPools)

  useEffect(() => {
    if (isReadyToGetUserPools && !alreadyGotUserPools) {
      dispatch(ExampleActions.getAndSetUserPools())
    }
    return () => {
    }
  }, [isReadyToGetUserPools, alreadyGotUserPools])

  useEffect(() => {
    if (provider && !alreadyGotUserPools) {
      dispatch(ExampleActions.getLastSnowballInfo())
    }
  }, [provider, alreadyGotUserPools])




  const isLoading = useSelector(selectIsLoadingPools)

  const gridApi = useRef<GridApi | null>(null);
  const GridData: PoolInfoItem[] = pools

  const rowsConfig = useRef<ColDef[]>([
    {
      headerName: 'Pair',
      field: 'name',
      cellStyle: {
        'padding-left': '0px',
      },

      flex: 1,
      minWidth: 100,
      cellRendererFramework: PoolRow
    },

  ])

  const gridConfig: GridConfigTypes = {
    columnDefs: [...rowsConfig.current],
    rowData: GridData,
  };

  const gridRendered = (e: GridReadyEvent) => {
    gridApi.current = e.api;
  };


  const handleRowClick = (e: RowClickedEvent) => {
    const { data }: { data: PoolInfoItem } = e
    const { address } = data
    dispatch(ExampleActions.toggleIsDetailsOpen(address))
    setTimeout(() => {
      gridApi.current?.forEachNode((node, index) => {
        if (node.data.address === address) {
          node.setRowHeight(node.data.isDetailsOpen ? 350 : 135);
          gridApi.current?.onRowHeightChanged();
        }
      });
    }, 0);
  }

  return (
    <GridWrapper
      id='marketWatchGridWrapper'
      className={`ag-theme-balham`}
    >
      <IsGettingUserPoolsIndicator />
      <AgGridReact
        onGridReady={gridRendered}
        onRowClicked={handleRowClick}
        animateRows
        headerHeight={0}
        rowHeight={135}
        columnDefs={gridConfig.columnDefs}
        rowData={gridConfig.rowData}
        defaultColDef={{
          suppressMenu: true,
          sortable: true,
          cellStyle: {
            'font-size': '12px',
            'line-height': '32px'
          }
        }}
        immutableData
        getRowNodeId={(data: PoolInfoItem) => {
          return data.address + data.userLPBalance + data.isDetailsOpen;
        }}
        overlayNoRowsTemplate={
          `<div>loading...</div>`
        }
      />
    </GridWrapper>
  )
}


const GridWrapper = styled('div')({
  height: 'calc(100vh - 310px)',
  '.ag-header,.ag-row': {
    border: 'none !important',
  },
  '.ag-cell': {
    outline: 'none !important',
    border: 'none !important',
  },
  '.ag-root-wrapper': {
    border: 'none !important',
  },
  '.ag-row-hover': {
    backgroundColor: 'transparent !important',
  }
})