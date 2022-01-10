import { ColDef } from "ag-grid-community";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { env } from "environment";
import { translations } from "locales/i18n";

interface ColumnDef extends ColDef{
  field?:keyof GaugeItem
}

export const bottomTableRowsConfig=({t,isSmall}:{t:any,isSmall:boolean}):ColumnDef[] =>([
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Name()),
    field: 'poolName',
    flex: 1,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Platform()),
    field: 'poolName',
    flex: 1,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Allocation()),
    field: 'poolName',
    flex: 1,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Allocationperday()),
    field: 'poolName',
    flex: 1,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Boosted_TOKEN_APR(),{token:env.MAIN_TOKEN_NAME}),
    field: 'poolName',
    flex: 1,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.VoteWeight()),
    field: 'poolName',
    flex: 1,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Balance()),
    field: 'poolName',
    flex: 1,
    minWidth: 100,
  },
])