import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput } from "../../selectors";
import { ExampleActions } from "../../slice";
import { SearchInput as Search } from "app/components/base/searchInput";
import { SnowPaper } from "app/components/base/SnowPaper";

export const SearchInput = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const searchValue = useSelector(selectSearchInput);

  const handleSearchChange = (v: string) => {
    dispatch(ExampleActions.setSearchInput(v));
  };
  const handleClearClick = () => {
    dispatch(ExampleActions.setSearchInput(""));
  };

  return (
    <SnowPaper>
      <Search
        placeHolder={t(translations.ExamplePage.SearchPoolName())}
        value={searchValue}
        onChange={handleSearchChange}
        onClearClick={handleClearClick}
      />
    </SnowPaper>
  );
};
