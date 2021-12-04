import { ListItem, ListItemButton, ListItemText, styled } from "@mui/material"
import { ColDef, GridApi, GridReadyEvent, RowClickedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.min.css'
import { useRef } from "react";
import { BNToFloat } from "utils/format"
import { PoolInfoItem } from "../../types";
import { IsGettingUserPoolsIndicator } from "./isGettingUserPoolsIndicator";
import { useSelector } from "react-redux";
import { selectIsLoadingPools, selectPoolsToShow } from "../../selectors";
import { SnowPaper } from "app/components/base/SnowPaper";
import { SnowPairsIcon } from "app/components/base/snowPairsIcon";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { ItemContainer, Left, PoolName, PoolNameAndProvider, PoolProvider, Right, StyledSnowPaper } from "./components";

interface GridConfigTypes {
  columnDefs: ColDef[];
  rowData: PoolInfoItem[];
}



const PoolRow = (params) => {
  const { data }: { data: PoolInfoItem } = params
  const toggleRowDetailsOpen = () => { }

  return (
    <StyledSnowPaper>
      <ItemContainer onClick={() => toggleRowDetailsOpen()}>
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

  const pools = useSelector(selectPoolsToShow)
  const isLoading = useSelector(selectIsLoadingPools)

  const gridApi = useRef<GridApi | null>(null);
  const GridData: PoolInfoItem[] = pools

  const rowsConfig = useRef<ColDef[]>([
    {
      headerName: 'Pair',
      field: 'name',
      cellStyle: {
        'padding-left': '0px'
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
    const { name } = data
    console.log(name)
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
          return data.address + data.userLPBalance;
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