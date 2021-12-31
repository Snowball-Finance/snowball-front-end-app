import { FormControl, InputLabel, styled, TextField } from "@mui/material"
import Zoom from '@mui/material/Zoom';
import { SnowPaper } from "app/components/base/SnowPaper";
import CrossIcon from "assets/images/iconComponents/cross";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables";
import { VotePower } from "../../../components/votePower";
import { selectIsNewProposalFormOpen } from "../../../selectors"
import { GovernanceActions } from "../../../slice";

export const NewProposalForm = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isOpen = useSelector(selectIsNewProposalFormOpen)

  const handleCloseClick = () => {
    dispatch(GovernanceActions.setIsNewProposalFormOpen(false))
  }

  return (
    <Wrapper isOpen={isOpen ? 'true' : ''}>
      <Zoom in={isOpen} style={{ transitionDelay: isOpen ? '100ms' : '0ms' }}>
        <ContentWrapper>
          <CloseWrapper onClick={handleCloseClick}>
            <CrossIcon color={CssVariables.darkText} />
          </CloseWrapper>
              <Title>
                {t(translations.GovernancePage.NewProposal())}
              </Title>
          <ProposalBodyWrapper>
            <Left>
              <LeftSnowPaper>
                <TextField fullWidth variant="outlined" margin="dense" />
                <TextField fullWidth variant="outlined" multiline maxRows={20} rows={20}  />
              </LeftSnowPaper>
            </Left>
            <Right>
              <VotePower />
<RightSnowPaper>
  
</RightSnowPaper>
            </Right>
          </ProposalBodyWrapper>
        </ContentWrapper>
      </Zoom>
    </Wrapper>
  )
}

const RightSnowPaper=styled(SnowPaper)({
  padding: '20px 12px'
})

const Column=styled('div')({
  display:'flex',
  flexDirection:'column',
  gap: '16px'
})

const Left = styled(Column)({
  flex:1
})
const Right = styled(Column)({})

const LeftSnowPaper = styled(SnowPaper)({
  padding: '20px',
})

const Title = styled('p')({
  fontSize: '20px',
  fontWeight: '500',
  margin: 0,
  color: CssVariables.black,
  marginBottom: '24px',
})

const ProposalBodyWrapper = styled('div')({
  width: '100%',
  display:"flex",
  gap:'16px'
})

const CloseWrapper = styled('div')({
  position: "absolute",
  top: 12,
  right: 12,
  cursor: 'pointer',
})

const ContentWrapper = styled('div')({
  width: '100%',
  padding: '24px 44px',
  backdropFilter: 'blur(20px)',
  borderRadius: CssVariables.paperBorderRadius
})

const Wrapper = styled('div')<{ isOpen: 'true' | '' }>(({ isOpen }) => ({
  position: 'absolute',
  top: 0,
  zIndex: 1,
  pointerEvents: isOpen ? 'auto' : 'none',
  opacity: isOpen ? 1 : 0,
  transition: 'opacity 0.3s ease-in-out',
  width: '100%',
  height: '100%',
}))