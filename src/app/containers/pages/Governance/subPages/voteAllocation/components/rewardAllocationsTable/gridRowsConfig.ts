import { ColDef } from "ag-grid-community";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { formatNumber } from "common/format";
import { env } from "environment";
import { translations } from "locales/i18n";

interface ColumnDef extends ColDef {
  field?: keyof GaugeItem
}

export const bottomTableRowsConfig = ({ t, isSmall }: { t: any, isSmall: boolean }): ColumnDef[] => ([
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Name()),
    field: 'poolName',
    flex: 1,
    minWidth: 100,
    valueFormatter: ({ data }: { data: GaugeItem }) => data.depositTokenName
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Platform()),
    field: 'source',
    flex: 1,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Allocation()),
    field: 'allocPoint',
    flex: 1,
    minWidth: 100,
    cellStyle: ({ data }: { data: GaugeItem }) => {
      return (
        {
          'font-size': '12px',
          'height': '100%',
          'display': 'flex ',
          'align-items': 'center ',
          'background': data.allocPoint > 0 ? `rgba(0, 255 ,0,${data.allocPoint})` : 'unset',
        }
      )
    },
    valueFormatter: ({ data }: { data: GaugeItem }) => formatNumber(data.allocPoint, 2)
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Allocationperday()),
    field: 'depositTokenName',
    flex: 1,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Boosted_TOKEN_APR(), { token: env.MAIN_TOKEN_NAME }),
    field: 'depositTokenName',
    flex: 1,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.VoteWeight()),
    field: 'depositTokenName',
    flex: 1,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Balance()),
    field: 'balance',
    flex: 1,
    minWidth: 100,
    valueFormatter: ({ data }: { data: GaugeItem }) => formatNumber(data.balance.toNumber(), 2)
  },
])