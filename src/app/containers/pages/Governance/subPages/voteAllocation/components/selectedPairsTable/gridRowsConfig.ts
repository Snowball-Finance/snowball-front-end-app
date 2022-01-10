import { ColDef } from "ag-grid-community";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { env } from "environment";
import { translations } from "locales/i18n";
import { RemoveButton } from "./removeButton";

interface ColumnDef extends ColDef{
  field?:keyof GaugeItem
}

export const topTableRowsConfig=({t,isSmall}:{t:any,isSmall:boolean}):ColumnDef[] =>([
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Pairs()),
    field: 'poolName',
    flex: 3,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.YourAllocation()),
    field: 'poolName',
    flex: 2,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.TOKEN_APR(),{token:env.MAIN_TOKEN_NAME}),
    field: 'poolName',
    flex: 3,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.WeightVariation()),
    field: 'poolName',
    flex: 2,
    minWidth: 100,
  },
  {
    headerName:'',
    flex: 1,
    minWidth: 100,
    cellRendererFramework:RemoveButton
  },
])