import { CircularProgress, ListItem, ListItemButton, ListItemText, styled } from "@mui/material"
import { Box } from "@mui/system";
import { ColDef, GridApi, GridParams, GridReadyEvent, RowClickedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.min.css'
import { useRef } from "react";
import { ListChildComponentProps, VariableSizeList as List } from 'react-window';
import { BNToFloat } from "utils/format"
import { PoolInfoItem } from "../types";
import { IsGettingUserPoolsIndicator } from "./isGettingUserPoolsIndicator";

interface GridConfigTypes {
  columnDefs: ColDef[];
  rowData: PoolInfoItem[];
}

const renderRow = (props: ListChildComponentProps) => {
  const { index, style, data } = props;
  const pool = data[index]

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText >
          {pool.name} {pool.userLPBalance && BNToFloat(pool.userLPBalance)}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

const getItemSize = (i: number) => {
  console.log({ i })
  return 45
}

const PoolRow = (params) => {
  const { data } = params
  return (
    <ListItem component="div" disablePadding>
      <ListItemButton>
        <ListItemText >
          {data.name} {data.userLPBalance && BNToFloat(data.userLPBalance)}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );

}

export const PoolsList = ({ isLoading, pools }) => {
  const gridApi = useRef<GridApi | null>(null);
  const GridData: PoolInfoItem[] = pools

  const rowsConfig = useRef<ColDef[]>([
    {
      headerName: 'Pair',
      field: 'name',
      cellStyle: {
        'text-transform': 'uppercase',
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
        rowHeight={45}
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

    // <Wrapper
    //   sx={{ bgcolor: 'background.paper' }}
    // >
    //   {isLoading && <CircularProgress />}
    //   <List
    //     height={window.innerHeight - 310}
    //     width={'100%'}
    //     itemSize={getItemSize}
    //     itemCount={pools.length}
    //     overscanCount={5}
    //     itemData={pools}
    //   >
    //     {renderRow}
    //   </List>
    // </Wrapper>
  )
}

const Wrapper = styled(Box)({
  border: '1px solid aqua',
  borderRadius: '8px',
  width: '100%',
})

const GridWrapper = styled('div')({
  height: 'calc(100vh - 310px)',
  '.ag-header,.ag-row': {
    border: 'none !important',
  }
})