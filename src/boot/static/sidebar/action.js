import { HomeSideBar } from "../typeActions";

export const SideBarAction = () => {
  const data = [

    // ----------------------------------------
    // -----------Start New sideBar------------
    // ----------------------------------------
    {
      title: "داشبورد",
      link: "",
      list: [],
    },

    {
      title: "مدیریت کاربران",
      link: "/userslist",
      list: [
        { title: "لیست کاربران", link: "/userslist",api: "ok" },
        { title: "اطلاعات کاربر", link: "/Profile",api: "ok" },
        { title: "اعتبارات", link: "/CreaditPerson", api: "ok" },
        { title: "ریز سفارشات", link: "/Orders", api: "ok" },
        { title: "پرتفوی", link: "/Stock", api: "ok" },
        { title: "گزارش امتیازات", link: "/Bonus",api: "ok" },
        { title: "گزارش معاملات", link: "/Orders",api: "ok"  },
      ],
    },

    {
      title: "محتوا",
      link: "/Posts",
      list: [
        { title: "پست", link: "/Posts", api: "ok" },
        { title: "تالار های گقتگو", link: "/Category", api: "ok" },
        { title: "اسلایدر", link: "/Slider",api: "ok" },
        { title: "اعلانات", link: "/Notify",api: "ok" },
      ],
    },

    {
      title: "جوایز",
      link: "/Gift",
      list: [
        { title: "جوایز", link: "/Gift", api: "ok"},
        { title: "کد های جایزه", link: "/GiftCode"}
    ],
    },

    {
      title: " دوره های آموزشی",
      link: "/EducationCourses",
      list: [{ title: "دوره های آموزشی", link: "/EducationCourses", api: "ok" }],
    },
    
    {
      title: " مسابقات",
      link: "/Compatitions",
      list: [{ title: "مسابقات", link: "/Compatitions", api: "ok" }],
    },

    {
      title: "عرضه اولیه",
      link: "/ipoList",
      list: [{ title: "لیست عرضه های اولیه", link: "/ipoList", api: "ok" },],
    },

    {
      title: "گزارشات",
      link: "/DisabledPage",
      list: [
        {title: "گزارش امتیاز اعضای باشگاه مشتریان", link: "/MembersScoresReport",},
        { title: "پیام های باشگاه", link: "/ClubMessages" },
        { title: "گزارش شرکت کنندگان در چالش", link: "/Challenge" },
        { title: "گزارش شرکنندگان در پیش چالش", link: "/PrevChallenge" },
      ],
    },

    {
      title: "صدای مشتری",
      link: "/Feedback",
      list: [{ title: "صدای مشتری", link: "/Feedback", api: "ok" }],
    },

    {
      title: "سایر",
      link: "/Branches",
      list: [
        { title: "شعب", link: "/Branches", api: "ok" },
        { title: "دفاتر پیشخوان", link: "/Goverments", api: "ok" },
        { title: "سوالات متداول", link: "/Faq", api: "ok" },
        { title: "کانال های تلگرامی", link: "/TelegramLink",api: "ok" },
        { title: "تعریف انواع ضمائم مدارک", link: "/Attachments" }
      ],
    },

    {
      title: "صفحات ایستا",
      link: "/JobsOpportunities",
      list: [
        // { title: "لینک های تلگرام", link: "/TelegramLink", api: "ok" },
        { title: "فرصت های شغلی", link: "/JobsOpportunities", api: "ok" },
        { title: "شماره حساب ها", link: "/Banking", api: "ok" },
        { title: "نرم افزار ها", link: "/Applications", api: "ok" },
        { title: "شرایط دریافت اعتبار", link: "/Creadit", api: "ok" },
        { title: "سامانه ها", link: "/Systems", api: "ok" },
        { title: "درباره ما", link: "/About_us", api: "ok" },
        { title: "راهنمای ثبت نام", link: "/SignUpHelp", api: "ok" },
        { title: "ویدئوهای آموزشی", link: "/InstructionalVideos", api: "ok" },
        { title: "بروشورهای آموزشی", link: "/Brochures", api: "ok" },
        { title: "عرضه های اولیه", link: "/Ipo", api: "ok" },
        // {title:'ویدئوهای آموزشی' , link:'/'},
        // {title:'اسلایدر' , link:'/'},
      ],
    },
    // ----------------------------------------
    // -----------End New sideBar--------------
    // ----------------------------------------


    // ----------------------------------------
    // -----------Start Old sideBar------------
    // ----------------------------------------
  //   {
  //     title: "داشبورد",
  //     link: "",
  //     list: [],
  //   },
  //   {
  //     title: "اعلانات",
  //     link: "/Notify",
  //     list: [
  //       { title: "اعلانات", link: "/Notify", api: "ok" }
  //     ],
  //   },
  //   {
  //     title: "مدیریت محتوا",
  //     link: "/Slider",
  //     list: [
  //       { title: "اسلایدر", link: "/Slider", api: "ok" },
  //       { title: "سوالات متداول", link: "/faq", api: "ok" },
  //       { title: "شعب", link: "/Branches", api: "ok" },
  //       { title: "دفاتر پیشخوان", link: "/Goverments", api: "ok" },
  //       { title: "امتیازات", link: "/Bonus", api: "ok" },
  //       { title: "تعریف انواع ضمائم مدارک", link: "/Attachments" },
  //       { title: "کد های جایزه", link: "/GiftCode" },
  //     ],
  //   },
  //   // {
  //   //     title: 'جوایز',
  //   //     link: '/ClubAwards',
  //   //     list: [
  //   //         { title: 'جوایز باشگاه', link: '/ClubAwards', api: "ok" },
  //   //         { title: 'درخواست های جوایز', link: '/AwardRequests', api: "ok" },
  //   //     ],
  //   // },

  //   {
  //     title: "گزارشات",
  //     link: "/DisabledPage",
  //     list: [
  //       { title: "گزارش امتیاز اعضای باشگاه مشتریان",link: "/MembersScoresReport",},
  //       { title: "پیام های باشگاه", link: "/ClubMessages" },
  //       { title: "گزارش شرکت کنندگان در چالش", link: "/Challenge" },
  //       { title: "گزارش شرکنندگان در پیش چالش", link: "/PrevChallenge" },
  //     ],
  //   },
  //   {
  //     title: "صفحات ایستا",
  //     link: "/TelegramLink",
  //     list: [
  //       { title: "لینک های تلگرام", link: "/TelegramLink", api: "ok" },
  //       { title: "فرصت های شغلی", link: "/JobsOpportunities", api: "ok" },
  //       { title: "شماره حساب ها", link: "/Banking", api: "ok" },
  //       { title: "نرم افزار ها", link: "/Applications", api: "ok" },
  //       { title: "شرایط دریافت اعتبار", link: "/Creadit", api: "ok" },
  //       { title: "سامانه ها", link: "/Systems", api: "ok" },
  //       { title: "درباره ما", link: "/About_us", api: "ok" },
  //       { title: "راهنمای ثبت نام", link: "/SignUpHelp", api: "ok" },
  //       { title: "ویدئوهای آموزشی", link: "/InstructionalVideos", api: "ok" },
  //       { title: "بروشورهای آموزشی", link: "/Brochures", api: "ok" },
  //       { title: "عرضه های اولیه", link: "/Ipo", api: "ok" },
  //       // {title:'ویدئوهای آموزشی' , link:'/'},
  //       // {title:'اسلایدر' , link:'/'},
  //     ],
  //   },
  //   {
  //     title: "پست ها",
  //     link: "/Posts",
  //     list: [
  //       { title: "پست", link: "/Posts", api: "ok" },
  //       { title: "دسته بندی", link: "/Category", api: "ok" },
  //     ],
  //   },
  //   {
  //     title: "پروفایل کاربر",
  //     link: "/Profile",
  //     list: [
  //       { title: "اطلاعات شخصی", link: "/Profile", api: "ok" },
  //       { title: "اعتبارات", link: "/CreaditPerson", api: "ok" },
  //       { title: "ریز سفارشات", link: "/Orders", api: "ok" },
  //       { title: "پرتفوی", link: "/Stock", api: "ok" },
  //     ],
  //   },
  //   {
  //     title: "لیست عرضه های اولیه",
  //     link: "/ipoList",
  //     list: [
  //       { title: "لیست عرضه های اولیه", link: "/ipoList", api: "ok" },
  //       // { title: 'پروفایل شخص', link: '/Profile', api: "ok" },
  //       // { title: 'اعتبارات شخص', link: '/CreaditPerson', api: "ok" },
  //       // { title: 'ریز سفارشات', link: '/Orders', api: "ok" },
  //       // { title: 'پرتفوی', link: '/Stock', api: "ok" },
  //     ],
  //   },
  //   {
  //     title: "لیست کاربران",
  //     link: "/userslist",
  //     list: [
  //       { title: "لیست کاربران", link: "/userslist", api: "ok" }
  //     ],
  //   },
  //   {
  //     title: "دوره های آموزشی",
  //     link: "/EducationCourses",
  //     list: [
  //       { title: "دورهای آموزشی", link: "/EducationCourses", api: "ok" }
  //     ],
  //   },
  //   {
  //     title: "صدای مشتری",
  //     link: "/Feedback",
  //     list: [
  //       { title: "صدای مشتری", link: "/Feedback", api: "ok" }
  //     ],
  //   },
  //   {
  //     title: "مسابقات",
  //     link: "/Compatitions",
  //     list: [
  //       { title: "مسابقات", link: "/Compatitions", api: "ok" }
  //     ],
  //   },
  //   {
  //     title: "جوایز",
  //     link: "/Gift",
  //     list: [
  //       { title: "جوایز", link: "/Gift", api: "ok" }
  //     ],
  //   },
  ];
    // ----------------------------------------
    // -----------End Old sideBar------------
    // ----------------------------------------

  return {
    type: HomeSideBar,
    payload: data,
  };
};
