import { getMultiContractData } from "services/multicall";

export const retrieveGauge = ({ pool, gaugesData, totalWeight }) => {
  const gaugeTokenData = gaugesData[pool.address];
  const gaugeData = gaugesData[pool.gaugeInfo.address];
  const address = pool.gaugeInfo.address;
  const balance = gaugeTokenData.balanceOf;
  const staked = gaugeData.balanceOf;
  const harvestable = gaugeData.earned;
  const totalSupply = gaugeData.totalSupply;
  const gauge = pool;
  const fullApy = 0;

  return {
    token: pool.address,
    address,
    gaugeAddress: address,
    totalWeight: +totalWeight.toString(),
    totalSupply,
    balance,
    staked,
    harvestable,
    depositTokenName: `${gauge?.kind === 'Snowglobe' ? gauge?.symbol + '-' : ''}` +
      `${gauge?.name}` || 'No Name',
    poolName: `${gauge?.kind === 'Snowglobe' ? gauge?.symbol + '-' : ''}` +
      `${gauge?.name || 'No Name'} Pool`,
    fullApy,
  }
}
export const getGauges = async ({ gaugeProxyContract, pools, provider, poolsCalls }) => {
  const totalWeight = await gaugeProxyContract.totalWeight();
  const gaugesData = await getMultiContractData(provider, poolsCalls);
  const gauges = await Promise.all(
    pools.map(async (pool) => {
      return await retrieveGauge({ pool, gaugesData, totalWeight });
    })
  );
  return gauges
}