import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { SnowSelect } from "app/components/base/SnowSelect";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedSort } from "../../selectors";
import { ExampleActions } from "../../slice";

const options = [
  {
    label: "APY",
    value: "apy",
  },
  {
    label: "TVL",
    value: "tvl",
  },
  {
    label: "Claimable",
    value: "claimable",
  },
];

export const SortSelect = () => {
  const dispatch = useDispatch();
  const selectedSort = useSelector(selectSelectedSort);

  const handleSelectChange = (v: string) => {
    dispatch(ExampleActions.setSelectedSort(v));
  };

  return (
    <SnowPaper>
      <Wrapper>
        <SnowSelect
          options={options}
          onChange={handleSelectChange}
          selectedValue={selectedSort}
        />
      </Wrapper>
    </SnowPaper>
  );
};

const Wrapper = styled("div")({
  width: "200px",
});
