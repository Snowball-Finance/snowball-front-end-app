import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";

export const ItemContainer = styled('div')(({ theme }) => ({
  padding: '30px 26px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
}));
export const Left = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
});

export const Right = styled('div')({
  display: 'flex',
  gap: '24px',
});

export const PoolNameAndProvider = styled('div')({});
export const PoolName = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '21px',
  color: '#6E6B7B',
  marginBottom: '4px',
}));

export const PoolProvider = styled('div')<{ name: string }>(({ name }) => {
  let background = 'rgba(255, 107, 0, 0.12)';
  let color = 'rgba(255, 159, 67, 1)';
  switch (name) {
    case 'Trader Joe':
      background = 'rgba(242, 113, 106, 0.12)';
      color = 'rgba(242, 113, 106, 1)';
      break;
    default:
      break;
  }
  return {
    background,
    color,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    padding: '5px 16px',
    borderRadius: '4px',
    fontSize: '11px',
    maxWidth: '120px',
    width: '120px',
    fontWeight: 600,
  };
});
export const StyledSnowPaper = styled(SnowPaper)<{ isopen: string }>(({ isopen }) => {
  return ({
    marginLeft: '5px',
    marginRight: '-5px',
    transition: 'height 5s ease-in-out',
    ...(isopen && {
      height: '340px',
    })
  })
})
