import { PoolsList } from "./poolsList";
import { SearchInput } from "./search";
import { styled } from "@mui/material";
import { PoolSelect } from "./poolSelect";
import { SortSelect } from "./sortSelect";

export const Pools = () => {
  return (
    <>
      <FiltersWrapper>
        <SearchInput />
        <PoolSelect />
        <SortSelect />
      </FiltersWrapper>
      <PoolsList />
    </>
  );
};

const FiltersWrapper = styled("div")({
  display: "flex",
  gap: "12px",
  marginBottom: "12px",
});
