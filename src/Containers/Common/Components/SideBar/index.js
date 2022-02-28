import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import Dashbord from "../../../page/Dashbord";
import Notify from "../../../page/Dossier/Notify";
import CustomersRequest from "../../../page/CustomersRequest/index"
import Attachments from "../../../page/Definitions/Attachments";
import Slider from "../../../page/Definitions/Slider";
import DiscountCode from "../../../page/Definitions/discountCode";
import StepByStepDiscount from "../../../page/stepByStepDiscount";
import Faq from "../../../page/Definitions/Faq";
import EducationCourses from "../../../page/Definitions/EducationCourses";
import ClubMessages from "../../../page/Report/ClubMessages";
import MembersScoresReport from "../../../page/Report/MembersScoresReport";
import PrevChallenge from "../../../page/Report/PrevChallenge";
import Challenge from "../../../page/Report/Challenge";
import Branches from "../../../page/Definitions/Branches";
import Goverments from "../../../page/Definitions/Goverments";
import Feedback from "../../../page/Definitions/Feedback";
import Bonus from "../../../page/Definitions/bonus";
import BonusMangemant from "../../../page/Definitions/bonusMangement";
import BonusComputing from "../../../page/Definitions/BonusComputing";
import Compatitions from "../../../page/Definitions/Compatitions";
import Gift from "../../../page/Definitions/Gift";
import GiftAggregated from "../../../page/Definitions/giftAggregated";
import GIFTCASH from "../../../page/Definitions/gtiftCash";
import GiftCashAggregated from "../../../page/Definitions/giftCashAggregated";
import Category from "../../../page/Posts/Category";
import IpoList from "../../../page/Definitions/ipoList";
import NewIpo from "../../../page/Definitions/ipoList/NewIpo/index";
import Signals from "./../../../page/signal_hafez/signals"
import SubscriptionPlans from "./../../../page/signal_hafez/SubscriptionPlans"
import MemberSubscriptions from "./../../../page/signal_hafez/memberSubscriptions"
import Alerts from "../../Components/Alerts";
import Banking from "../../../page/staticPage/Banking";
import JobsOpportunities from "../../../page/staticPage/JobsOpportunities";
import TelegramLink from "../../../page/staticPage/TelegramLink";
import Applications from "../../../page/staticPage/Applications";
import Creadit from "../../../page/staticPage/Creadit";
import Systems from "../../../page/staticPage/Systems";
import AboutUs from "../../../page/staticPage/About_us";
import InstructionalVideos from "../../../page/staticPage/InstructionalVideos";
import SignUpHelp from "../../../page/staticPage/SignUpHelp";
import Brochures from "../../../page/staticPage/Brochures";
import Ipo from "../../../page/staticPage/Ipo";
import Permitions from "./../../../page/permitions"
import BonusAggregated from './../../../page/Definitions/BonusAggregated';
import { makeStyles } from "@material-ui/core/styles";
import { NavSidebar } from "./../SideBar2"
import GeneralStatistics from './../../../page/Dashbord/generalStatistics';
import { SideBarAction } from "../../../../boot/static/sidebar/action";
import DisabledPage from "./../../Components/DisabledPage";
import Posts from "./../../../page/Posts";
import Profile from "./../../../page/profile/person";
import CreaditPerson from "./../../../page/profile/Creadit";
// import Orders from "./../../../page/profile/Orders";
import NewOrders from "./../../../page/profile/newOrders";
import Stock from "./../../../page/profile/Stock";
import StockManagement from "./../../../page/stock/stockManagement";
import StockDataManagement from "./../../../page/stock/stockDataManagement";
import SectorDataManagement from "./../../../page/stock/sectorDataManagement";
import UsersList from "../../../page/usersList";
import ChangeLog from "../../../page/changeLog";
import ChangeBroker from '../../../page/stock/changeBroker';
import Work_with_us from "../../../page/FormManager/Work_with_us"
import LogInList from "../../../page/logInList"
import Marketer from "../../../page/FormManager/Marketer/index";
import Contactus from "../../../page/FormManager/Contactus/index";
import Payments from './../../../page/payments/payments';
import StockCash from "../../../page/stock/stockCash";




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#FFFFFF",
    zIndex: theme.zIndex.drawer + 1,
    border: "1px solid #EFEFEF",
    boxShadow: "none",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    fontFamily: theme.font,
    backgroundColor: "#1E1E2D !important",
    color: theme.colorGray1,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    fontFamily: theme.font,
    backgroundColor: "#1E1E2D !important",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
  },
  content: {
    flexGrow: 1,
  },

  iconsSidebar: {
    fill: theme.colorGray1,
    width: 30,
    height: 30,
    "&:hover": {
      fill: theme.colorBlue,
    },
  },
  iconsMenu: {
    fill: theme.colorBlue,
    width: 20,
    height: 35,
    "&:hover": {
      fill: theme.colorBlue,
    },
  },
  gridSideBar: {
    color: "white",
    display: "flex",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  titleSideBar: {
    marginRight: 8,
  },
  logoMobin: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    top: 1,
    color: "#707070",
  },
  logoM: {
    marginRight: 10,
    backgroundColor: theme.colorGreen2,
    color: theme.colorGreen1,
    padding: "0px 5px",
  },
  grid: {
    marginTop: 60,
  },
  text: {
    fontWeight: 900,
  },
  link: {
    color: theme.colorGray1,
    fontWeight: "bold !impotant",
  },
  exit: {
    width: "80%",
    margin: "auto",
    position: "absolute",
    bottom: 20,
    left: "calc(50% - 40%)",
  },
}));

export default function MiniDrawer() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.SideBarReducer);

  let { pathname } = useLocation();

  const [indexDataHeader, SetIndexDataHeader] = useState(0); //eslint-disable-line no-unused-vars

  useEffect(() => {
    dispatch(SideBarAction());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    data.sidebar?.map((item, ind) => {
      if (pathname === "/") {
        SetIndexDataHeader(0);
        return null;
      }

      if (pathname === "/DisabledPage") {
        SetIndexDataHeader(0);
        return null;
      }

      item.list.forEach((itemChild) => {
        if (itemChild.link === pathname) {
          SetIndexDataHeader(ind);
        }
      });
      return item;
    });
  }, [pathname, data]);

  const classes = useStyles();


  return (
    <div className={classes.root}>
      <NavSidebar />
    
      <main
        className={classes.content}
        style={{ width: "100%", overflowX: "hidden" }}
      >
        <div className={classes.toolbar} />
        <div className={classes["grid"]}>
          {<Alerts />}

          <Switch>
            <Route exact path="/CustomersRequest">
              <CustomersRequest />
            </Route>
            <Route exact path="/Notify">
              <Notify />
            </Route>
            {/* ------------Definitions--------------- */}
            <Route exact path="/Attachments">
              <Attachments />
            </Route>
            <Route exact path="/Slider">
              <Slider />
            </Route>
            <Route exact path="/DiscountCode">
              <DiscountCode />
            </Route>
            <Route exact path="/Stepbystepdiscount">
              <StepByStepDiscount />
            </Route>
            <Route exact path="/Branches">
              <Branches />
            </Route>
            <Route exact path="/Goverments">
              <Goverments />
            </Route>

            <Route exact path="/Feedback">
              <Feedback />
            </Route>

            <Route exact path="/Faq">
              <Faq />
            </Route>

            <Route exact path="/EducationCourses">
              <EducationCourses />
            </Route>

            <Route exact path="/Compatitions">
              <Compatitions />
            </Route>

            <Route exact path="/Gift">
              <Gift />
            </Route>

            <Route exact path="/GiftAggregated">
              <GiftAggregated />
            </Route>

            <Route exact path="/GiftCash">
              <GIFTCASH />
            </Route>

            <Route exact path="/GiftCashAggregated">
              <GiftCashAggregated />
            </Route>

            <Route exact path="/BonusAggregated">
              <BonusAggregated />
            </Route>

            <Route exact path="/BonusMangemant">
              <BonusMangemant />
            </Route>
            
            <Route exact path="/BonusComputing">
              <BonusComputing />
            </Route>

            <Route exact path="/Bonus">
              <Bonus />
            </Route>

            <Route exact path="/Signals">
              <Signals />
            </Route>

            <Route exact path="/SubscriptionPlans">
              <SubscriptionPlans />
            </Route>

            <Route exact path="/memberSubscriptions">
              <MemberSubscriptions />
            </Route>


            {/* <Route exact path='/ipoList/filter' >
              <FilterSortStock />
            </Route> */}
            <Route exact path="/ipoList">
              <IpoList />
            </Route>

            {/* ------------awards--------------- */}
            {/* <Route exact path='/ClubAwards' >
              <ClubAwards />
            </Route>
            <Route exact path='/AwardRequests' >
              <AwardRequests />
            </Route> */}

            {/*---------------report----------------- */}
            <Route exact path="/ClubMessages">
              <ClubMessages />
            </Route>
            <Route exact path="/MembersScoresReport">
              <MembersScoresReport />
            </Route>
            <Route exact path="/PrevChallenge">
              <PrevChallenge />
            </Route>
            <Route exact path="/Challenge">
              <Challenge />
            </Route>

            {/*---------------static page----------------- */}
            <Route exact path="/InstructionalVideos">
              <InstructionalVideos />
            </Route>

            <Route exact path="/Banking">
              <Banking />
            </Route>

            <Route exact path="/JobsOpportunities">
              <JobsOpportunities />
            </Route>

            <Route exact path="/TelegramLink">
              <TelegramLink />
            </Route>

            <Route exact path="/Applications">
              <Applications />
            </Route>

            <Route exact path="/Creadit">
              <Creadit />
            </Route>

            <Route exact path="/Systems">
              <Systems />
            </Route>

            <Route exact path="/About_us">
              <AboutUs />
            </Route>

            <Route exact path="/Brochures">
              <Brochures />
            </Route>

            <Route exact path="/SignUpHelp">
              <SignUpHelp />
            </Route>

            <Route exact path="/Ipo">
              <Ipo />
            </Route>
            <Route exact path="/NewIpo">
              <NewIpo />
            </Route>

            {/*---------------static page----------------- */}

            <Route exact path="/Posts">
              <Posts />
            </Route>

            <Route exact path="/Category">
              <Category />
            </Route>

            <Route exact path="/DisabledPage">
              <DisabledPage />
            </Route>

            {/*-------------------Profile----------------- */}
            <Route exact path="/Profile">
              <Profile />
            </Route>
            <Route exact path="/CreaditPerson">
              <CreaditPerson />
            </Route>
            <Route exact path="/Orders">
              <NewOrders />
              {/* <Orders /> */}
            </Route>

            <Route exact path="/NewOrders">
              <NewOrders />
            </Route>

            <Route exact path="/Stock">
              <Stock />
            </Route>

            <Route exact path="/userslist">
              <UsersList />
            </Route>

            <Route exact path="/permitions">
              <Permitions />
            </Route>


            {/*-------------------stock----------------- */}
            <Route exact path="/StockManagement">
              <StockManagement />
            </Route>

            <Route exact path="/StockDataManagement">
              <StockDataManagement />
            </Route>

            <Route exact path="/SectorDataManagement">
              <SectorDataManagement />
            </Route>

            <Route exact path="/changeBroker">
              <ChangeBroker />
            </Route>

            <Route exact path="/ChangeLog">
              <ChangeLog />
            </Route>


            <Route exact path="/GeneralStatistics">
              <GeneralStatistics />
            </Route>


            <Route exact path="/logInList">
              <LogInList />
            </Route>

            <Route exact path="/">
              <Dashbord />
            </Route>

            <Route exact path="/workWithUs">
              <Work_with_us />
            </Route>

            <Route exact path="/Marketer">
              <Marketer />
            </Route>

            <Route exact path="/Contactus">
              <Contactus />
            </Route>
            <Route exact path="/stockCash">
              <StockCash />
            </Route>


            <Route exact path="/Payments">
              <Payments />
            </Route>

          </Switch>
        </div>
      </main>
    </div>
  );
}
