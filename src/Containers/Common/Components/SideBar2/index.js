/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { ERROR405 } from "./../../../../boot/api/typeActions";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Stars,
  Apps,
  CardGiftcard,
  Feedback,
  Group,
  LocalLibrary,
  MoreHoriz,
  Notifications,
  NoteAdd,
  CreditCard,
  AccountTree,
  SportsEsports,
  LocalAtm,
} from "@material-ui/icons";

import DescriptionIcon from "@material-ui/icons/Description";
import BlockIcon from "@material-ui/icons/Block";
import Description from "@material-ui/icons/Description";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import { permitted_methods } from "../../method/permitted_method";
import { getSessionParam } from "../../method/getSessionParam";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";

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
    // transition: theme.transitions.create(['width', 'margin'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
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
    padding: "0px 5px",
    color: " #25C8C0",
    marginLeft: " 10px",
    backgroundColor: "#C9F7F5",
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

export const NavSidebar = () => {
  let member_permitted_methods = getSessionParam("member_permitted_methods");

  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen] = useState(true);
  const handleExit = () => {
    dispatch({ type: ERROR405 });
  };
  const dispatch = useDispatch();
  const classes = useStyles();
  const [regex, setRegex] = useState("");
  const [dataMenu, setdataMenu] = useState([]);

  // let pattern = /(FEEDBACK\..*)|(CLUBMEMBER\..*)/g

  let ConvertToUpperCase = (item) => {
    return item.toUpperCase();
  };

  useEffect(() => {
    setRegex(permitted_methods(member_permitted_methods));
  }, []); // eslint-disable-line  react-hooks/exhaustive-deps

  let handleData = () => {
    return [
      {
        title: "داشبورد",
        itemId: "/",
        list: [],
        elemBefore: () => <Apps />,
        subNav: [],
      },
      {
        title: "سطح دسترسی",
        itemId: "#100",
        list: [],
        elemBefore: () => <BlockIcon />,
        subNav: [
          {
            title: "سطح دسترسی",
            itemId: "/permitions",
            // zone: "(.*)" === regex ? true : false
            zone: "permisson_manager".match(regex) ? true : false,
          },
        ],
      },
      {
        title: "مدیریت کاربران",
        itemId: "#",
        elemBefore: () => <Group />,
        subNav: [
          {
            title: "آمار کلی",
            itemId: "/generalStatistics",
            zone: ConvertToUpperCase("clubmember.").match(regex) ? true : false,
          },
          {
            title: "تغییر ناظر",
            itemId: "/changeBroker",
            zone: ConvertToUpperCase("changebroker.").match(regex)
              ? true
              : false,
          },
          {
            title: "لیست کاربران",
            itemId: "/userslist",
            zone: "CLUBMEMBER.".match(regex) ? true : false,
          },
          {
            title: "اطلاعات کاربر",
            itemId: "/Profile",
            zone: ConvertToUpperCase("clubmember.").match(regex) ? true : false,
          },
          {
            title: "لیست ورود و خروج کاربران",
            itemId: "/logInList",
            zone: ConvertToUpperCase("CLUBMEMBER.").match(regex) ? true : false,
          },
          {
            title: "درخواست های مشتری شدن",
            itemId: "/CustomersRequest",
            zone: ConvertToUpperCase("brokercustomer.").match(regex)
              ? true
              : false,
          },

          // {
          //   title: "اعتبارات",
          //   link: "/CreaditPerson",
          //   api: "ok",
          //   itemId: "/CreaditPerson",
          // },
          // {
          //   title: "گزارش امتیازات",
          //   link: "/Bonus",
          //   api: "ok",
          //   itemId: "/Bonus",
          // },
        ],
      },

      {
        title: "امتیازات",
        itemId: "#2",
        elemBefore: () => <Stars />,
        subNav: [
          {
            title: "گزارش امتیازات",
            itemId: "/Bonus",
            zone: ConvertToUpperCase("bonus.").match(regex) ? true : false,
          },
          {
            title: "گزارش مدیریتی امتیازات",
            itemId: "/BonusMangemant",
            zone: ConvertToUpperCase("bonus.").match(regex) ? true : false,
          },
          {
            title: "گزارش تجمیعی امتیازات",
            itemId: "/BonusAggregated",
            zone: ConvertToUpperCase("bonus.").match(regex) ? true : false,
          },
          {
            title: "محاسبه مجدد امتیاز",
            itemId: "/BonusComputing",
            zone: ConvertToUpperCase("bonus.").match(regex) ? true : false,
          },
        ],
      },

      {
        title: "جوایز",
        itemId: "#3",
        elemBefore: () => <CardGiftcard />,
        subNav: [
          {
            title: "جوایز",
            itemId: "/Gift",
            zone: ConvertToUpperCase("gift.").match(regex) ? true : false,
          },
          {
            title: "کد های تخفیف",
            itemId: "/DiscountCode",
            zone: ConvertToUpperCase("gift.").match(regex) ? true : false,
          },
          {
            title: "گزارش تجمیعی جوایز",
            itemId: "/GiftAggregated",
            zone: ConvertToUpperCase("gift.").match(regex) ? true : false,
          },
          {
            title: "گزارش جوایز شارژ نقدی",
            itemId: "/Giftcash",
            zone: ConvertToUpperCase("ONLINECHARGE.").match(regex)
              ? true
              : false,
          },
          {
            title: "گزارش  تجمیعی جوایز شارژ نقدی",
            itemId: "/GiftCashAggregated",
            zone: ConvertToUpperCase("ONLINECHARGE.").match(regex)
              ? true
              : false,
          },
        ],
      },

      {
        title: "سیگنال های هدف حافظ",
        itemId: "#16",
        elemBefore: () => <SubscriptionsIcon />,
        subNav: [
          {
            title: "سیگنال ها",
            itemId: "/Signals",
            zone: ConvertToUpperCase("HADAFHAFEZ.").match(regex) ? true : false,
          },
          {
            title: "پلن های اشتراک",
            itemId: "/SubscriptionPlans",
            zone: ConvertToUpperCase("HADAFHAFEZ.").match(regex) ? true : false,
          },
          {
            title: "لیست سابقه کاربران",
            itemId: "/MemberSubscriptions",
            zone: ConvertToUpperCase("HADAFHAFEZ.").match(regex) ? true : false,
          },
        ],
      },

      {
        title: "پرداخت وجه",
        itemId: "#18",
        elemBefore: () => <LocalAtm />,
        subNav: [
          {
            title: "گزارش پرداخت وجه",
            itemId: "/Payments",
            zone: ConvertToUpperCase("payment.").match(regex) ? true : false,
          },
        ],
      },
      {
        title: "آموزش",
        itemId: "#4",
        elemBefore: () => <LocalLibrary />,
        subNav: [
          {
            title: "نرم افزار ها",
            itemId: "/Applications",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false,
          },
          {
            title: " دوره های آموزشی",
            itemId: "/EducationCourses",
            zone: ConvertToUpperCase("course.").match(regex) ? true : false,
          },
          {
            title: "ویدئوهای آموزشی",
            itemId: "/InstructionalVideos",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false,
          },
          {
            title: "بروشورهای آموزشی",
            itemId: "/Brochures",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false,
          },
        ],
      },

      {
        title: "محتوا",
        itemId: "#5",
        elemBefore: () => <Description />,
        subNav: [
          {
            title: "پست",
            itemId: "/Posts",
            zone: ConvertToUpperCase("post.").match(regex) ? true : false,
          },

          {
            title: "اسلایدر",
            itemId: "/Slider",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false,
          },
          {
            title: "تالار های گقتگو",
            itemId: "/Category",
            zone: ConvertToUpperCase("forum.").match(regex) ? true : false,
          },
          {
            title: "سوالات متداول",
            itemId: "/Faq",
            zone: ConvertToUpperCase("faq.").match(regex) ? true : false,
          },
          {
            title: "راهنمای ثبت نام",
            itemId: "/SignUpHelp",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false,
          },
          {
            title: "درباره ما",
            itemId: "/About_us",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false,
          },
        ],
      },

      {
        title: "اطلاع رسانی",
        itemId: "#6",
        elemBefore: () => <Notifications />,
        subNav: [
          {
            title: "اعلانات",
            itemId: "/Notify",
            zone: ConvertToUpperCase("notification.").match(regex)
              ? true
              : false,
          },

          {
            title: "ارسال پیامک",
            itemId: "/Notify",
            zone: ConvertToUpperCase("notification.").match(regex)
              ? true
              : false,
          },

          {
            title: "ارسال ایمیل",
            itemId: "/Notify",
            zone: ConvertToUpperCase("notification.").match(regex)
              ? true
              : false,
          },
        ],
      },
      {
        title: "معاملات",
        itemId: "#15",
        elemBefore: () => <DescriptionIcon />,
        subNav: [
          {
            title: "پرتفوی",
            itemId: "/Stock",
            zone: ConvertToUpperCase("portfolio.").match(regex) ? true : false,
          },
          {
            title: "گزارش معاملات",
            itemId: "/orders",
            zone: ConvertToUpperCase("order.").match(regex) ? true : false,
          },

          {
            title: "گزارش تخفیف پله‌ای",
            itemId: "/Stepbystepdiscount",
            zone: ConvertToUpperCase("order.").match(regex) ? true : false,
          },
        ],
      },
      {
        title: "سهام",
        itemId: "#13",
        elemBefore: () => <EditAttributesIcon />,
        subNav: [
          {
            title: "مدیریت نمادها",
            itemId: "/StockManagement",
            zone: ConvertToUpperCase("stock.").match(regex) ? true : false,
          },
          {
            title: "مدیریت داده های سهام",
            itemId: "/StockDataManagement",
            zone: ConvertToUpperCase("stock.").match(regex) ? true : false,
          },
          {
            title: "مدیریت داده‌های صنایع",
            itemId: "/SectorDataManagement",
            zone: ConvertToUpperCase("stock.").match(regex) ? true : false,
          },
          {
            title: "سود نقدی سهام",
            itemId: "/stockCash",
            zone: ConvertToUpperCase("stock.").match(regex) ? true : false,
          },
        ],
      },

      {
        title: "مسابقات",
        itemId: "#7",
        elemBefore: () => <SportsEsports />,
        subNav: [
          {
            title: "مسابقات",
            itemId: "/Compatitions",
            zone: ConvertToUpperCase("competition.").match(regex)
              ? true
              : false,
          },

          // {
          //   title: "شرکت کنندگان در پیش چالش",
          //   // itemId: "#disable4",
          //   zone: ConvertToUpperCase("competition.").match(regex) ? true : false
          // },

          // {
          //   title: "شرکت کنندگان در چالش",
          //   // itemId: "#disable5",
          //   zone: ConvertToUpperCase("competition.").match(regex) ? true : false
          // },
        ],
      },

      {
        title: "عرضه اولیه",
        itemId: "#8",
        elemBefore: () => <NoteAdd />,
        subNav: [
          {
            title: "عرضه های اولیه",
            itemId: "/Ipolist",
            zone: ConvertToUpperCase("ipo.").match(regex) ? true : false,
          },
          {
            title: "تعریف عرضه اولیه",
            itemId: "/NewIpo",
            zone: ConvertToUpperCase("ipo.").match(regex) ? true : false,
          },
          {
            title: "توضیحات عرضه اولیه",
            itemId: "/Ipo",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false,
          },
        ],
      },

      {
        title: "اعتبارات",
        itemId: "#9",
        elemBefore: () => <CreditCard />,
        subNav: [
          {
            title: "شرایط دریافت اعتبار",
            itemId: "/Creadit",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false,
          },
          {
            title: "اطلاعات اعتبار کاربر",
            itemId: "/CreaditPerson",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false,
          },
        ],
      },

      {
        title: "صدای مشتری",
        itemId: "#10",
        elemBefore: () => <Feedback />,
        subNav: [
          {
            title: "صدای مشتری",
            itemId: "/Feedback",
            zone: ConvertToUpperCase("feedback.").match(regex) ? true : false,
          },
        ],
      },

      {
        title: "راه های ارتباطی",
        itemId: "#11",
        elemBefore: () => <AccountTree />,
        subNav: [
          {
            title: "شعب",
            itemId: "/Branches",
            zone: ConvertToUpperCase("shoab.").match(regex) ? true : false,
          },

          {
            title: "دفاتر پیشخوان",
            itemId: "/Goverments",
            zone: ConvertToUpperCase("pishkhan.").match(regex) ? true : false,
          },

          {
            title: "کانال های تلگرامی",
            itemId: "/TelegramLink",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false,
          },
        ],
      },

      {
        title: "مدیریت فرم ها",
        itemId: "#14",
        elemBefore: () => <DescriptionIcon />,
        subNav: [
          {
            title: "فرم همکاری با ما",
            itemId: "workwithus",
            zone: ConvertToUpperCase("workwithus.").match(regex) ? true : false,
          },
          {
            title: "فرم بازاریابی",
            itemId: "marketer",
            zone: ConvertToUpperCase("marketer.").match(regex) ? true : false,
          },
          {
            title: "فرم ارتباط با ما",
            itemId: "contactus",
            zone: ConvertToUpperCase("contactus.").match(regex) ? true : false,
          },
        ],
      },

      {
        title: "سایر",
        itemId: "#12",
        elemBefore: () => <MoreHoriz />,
        subNav: [
          {
            title: "فرصت های شغلی",
            itemId: "/JobsOpportunities",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false,
          },
          {
            title: "شماره حساب ها",
            itemId: "/Banking",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false,
          },

          {
            title: "سامانه ها",
            itemId: "/Systems",
            zone: ConvertToUpperCase("static.").match(regex) ? true : false,
          },

          // {
          //   title: "تعریف انواع ضمائم مدارک",
          //   itemId: "#disable6",
          //   zone: ConvertToUpperCase("static.").match(regex) ? true : false
          // },
        ],
      },
    ];
  };

  useEffect(() => {
    let filterLevel2 = [];
    for (let i = 0; i < handleData().length; i++) {
      let subNav = handleData()[i].subNav.filter((i) => i?.zone);
      let data = { ...handleData()[i], subNav: subNav };
      filterLevel2.push(data);
    }

    let res = filterLevel2.filter((item, ind) =>
      ind === 0 ? true : item.subNav.length
    );

    setdataMenu(res);
  }, [regex]); // eslint-disable-line  react-hooks/exhaustive-deps

  if (!member_permitted_methods) {
    handleExit();
  }

  if (!regex) {
    return null;
  }

  return (
    <React.Fragment>
      {/* Sidebar Overlay */}

      {/* <div>
        <button
          className="btn-menu"
          onClick={() => setIsSidebarOpen(true)}
          type="button"
        >
          <Icon name="burger" className="w-6 h-6" />
        </button>
      </div> */}

      {/* Sidebar */}

      <div
        className={`hideScroll fixed inset-y-0 left-0 z-30 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
        style={{
          width: "330px",
          height: "98vh",
          backgroundColor: "#E2E8F0",
          color: "",
          borderInline: "solid 2px #E2E8F0",
          direction: "initial",
          overflowY: "auto",
          msOverflowStyle: "none",
          scrollBehavior: "smooth",
        }}
      >
        <div
          className="flex items-center justify-center mt-10 text-center py-6"
          style={{
            marginBottom: "30px",
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          <span
            className="mx-2 text-2xl font-semibold text-black"
            style={{ fontSize: "18px", color: "", fontWeight: "bold" }}
          >
            صفحه مدیریت باشگاه مشتریان
          </span>
          <p style={{ color: "grey", fontSize: "11px" }}>نسخه 1.4.9</p>
          <div style={{ textAlign: "center", paddingBottom: "5px" }}>
            <Link to="/changeLog">
              <h6 style={{ color: "grey", margin: "0" }}>لیست تغییرات</h6>
            </Link>
          </div>
        </div>

        <Navigation
          className="w-800"
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
          items={dataMenu}
        />
      </div>

      <div
        style={{
          backgroundColor: "white",
          width: "84.4%",
          height: "75px",
          position: "absolute",
          right: "293px",
        }}
      >
        <div className={classes["logoMobin"]}>
          <p className={classes["logoM"]}>M</p>
          <p>مبین سرمایه</p>
          <div>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ExitToAppIcon />}
              fullWidth
              onClick={handleExit}
              style={{
                width: "0px",
                marginRight: "20px",
              }}
            ></Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
