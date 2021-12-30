import { Route, Switch } from "react-router-dom";
import { Proposals } from "./subPages/proposals";
import { NewProposal } from "./subPages/newProposal";
import { replace } from "connected-react-router";
import { GovernanceSubPages } from "./routes";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppPages } from "app/types";
import { styled } from "@mui/material";
import { VoteAllocation } from "./subPages/voteAllocation";



export const GovernanceBody=()=>{

  const dispatch = useDispatch()
  const path = window.location.pathname
  const { t } = useTranslation()
  const handleTabChange = (page: string) => {
    dispatch(replace(page))
  }

  return (
    <PageWrapper>
        <Switch>
          <Route exact path={AppPages.GovernancePage} >
            <Proposals   />
          </Route>
          <Route path={`${GovernanceSubPages.proposals}`} >
            <Proposals />
          </Route>
          <Route path={`${GovernanceSubPages.newProposal}`} >
            <NewProposal   />
          </Route>
          <Route path={`${GovernanceSubPages.voteAllocation}`} >
            <VoteAllocation />
          </Route>
        </Switch>
      </PageWrapper>
  )
}

const PageWrapper = styled('div')({})