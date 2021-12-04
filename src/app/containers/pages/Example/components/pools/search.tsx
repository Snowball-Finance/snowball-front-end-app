import { t } from "i18next"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { selectSearchInput } from "../../selectors"
import { ExampleActions } from "../../slice"

export const SearchInput = () => {
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const searchValue = useSelector(selectSearchInput)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(ExampleActions.setSearchInput(e.target.value))
  }
  return <input placeholder={t(translations.ExamplePage.SearchPoolName())} value={searchValue} onChange={handleSearchChange} />
}