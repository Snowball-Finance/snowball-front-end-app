import { styled, useMediaQuery } from "@mui/material"
import { ColDef } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import { selectSelectedVoteAllocationPairsArray } from "app/containers/pages/Governance/selectors"
import { GaugeItem } from "app/containers/PoolsAndGauges/types"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables"
import { theme } from "styles/theme"
import { topTableRowsConfig } from "./gridRowsConfig"

interface GridConfigTypes {
  columnDefs: ColDef[];
  rowData: GaugeItem[];
}

export const SelectedPairsTable = () => {
  const { t } = useTranslation()
  const selectedPairs = useSelector(selectSelectedVoteAllocationPairsArray)
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const noSelectedPair = selectedPairs.length === 0
  const rowConfigs = topTableRowsConfig({ t,isSmall:smallScreen })
  const gridConfig: GridConfigTypes = {
    columnDefs: [...rowConfigs],
    rowData: selectedPairs,
  };

  return (<>
    {noSelectedPair
      ?
      <></>
      :
      <Wrapper  className='ag-theme-balham'>
        <AgGridReact
          animateRows
          headerHeight={52}
          rowHeight={60}
          columnDefs={gridConfig.columnDefs}
          rowData={gridConfig.rowData}
          defaultColDef={{
            suppressMenu: true,
            sortable: false,
            cellStyle: {
              'font-size': '12px',
              'height': '100%',
              'display': 'flex ',
              'align-items': 'center ',
            }
          }}
          immutableData
          getRowNodeId={(data: GaugeItem) => data.address}
        />
      </Wrapper>
    }
  </>)
}

const Wrapper = styled('div')({
  height:'250px',
  border:'none',
  '.ag-header':{
    borderRadius: '8px',
    border:`1px solid ${CssVariables.lightGrey}`
  },
  '.ag-header-row':{
    fontWeight:'400 !important'
  },
  '.ag-row':{
    borderRadius:'8px'
  },
  '.ag-center-cols-viewport':{
    overflowX:'hidden'
  }
})