import { CircularProgress, ListItem, ListItemButton, ListItemText, styled } from "@mui/material"
import { Box } from "@mui/system";
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import { BNToFloat } from "utils/format"
import { PoolInfoItem } from "../types"


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



export const PoolsList = ({ isLoading, pools }) => {
  return (

    <Box
      sx={{ width: '100%', height: 400, bgcolor: 'background.paper' }}
    >
      {isLoading && <CircularProgress />}
      <FixedSizeList
        height={window.innerHeight - 310}
        width={'100%'}
        itemSize={60}
        itemCount={pools.length}
        overscanCount={5}
        itemData={pools}
      >
        {renderRow}
      </FixedSizeList>
    </Box>


  )
}
const Balance = styled('span')({
  background: 'aqua',
})

const Item = styled('div')({
  fontsize: '12px',
})

const Wrapper = styled('div')({})