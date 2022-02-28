import { combineReducers } from "redux";
import { ERROR405 } from "./api/typeActions";

//static
import { SideBarReducer } from "./static/sidebar/Reducer";

import { reducers_alert } from "./api/alerts/reducer";
//api
import { club_member_v1_reducer } from "./api/clubmember/reducer";
import { clubmember_select_reducer } from './api/permitions/reducer'
import { login_v1_Reducer } from "./api/login_v1/Reducer";
import { faq_v1_select_Reducer } from "./api/Definitions/faq/faq_v1_select/reducer";
import { feedback_v1_select_Reducer } from "./api/Definitions/feedback/feedback_v1_select/reducer";
import { pishkhan_v1_select_Reducer } from "./api/Definitions/pishkhan/pishkhan_v1_select/reducer";
import { slider_v1_select_Reducer } from "./api/Definitions/slider/slider_v1_select/reducer";
import { registeration_v1_select_Reducer } from "./api/Definitions/EducationCourses/registeration_v1_select/reducer";
import { forum_v1_select_Reducer } from "./api/post-forum/forum/forum_v1_select/reducer";
import { post_v1_select_Reducer } from "./api/post-forum/post/post_v1_select/reducer";
import { comments_v1_select_Reducer } from "./api/post-forum/post/comments_v1_select/reducer";
import { post_v1_select_Reducer_filter } from "./api/post-forum/post/post_v1_select_filter/reducer";
import { select_ipo_list_reducer } from "./api/Definitions/ipoLIst/reducer";

import { education_video_v1_select_Reducer } from "./api/staticPage/education_video/education_video_v1_select/reducer";
import { ACCOUNTS_v1_select_Reducer } from "./api/accounts/accounts_v1_select/reducer";
import { JobsOpportunities_v1_select_Reducer } from "./api/JobsOpportunities/JobsOpportunities_v1_select/reducer";
import { telegram_link_v1_select_Reducer } from "./api/staticPage/TelegramLink/telegramLink_v1_select/reducer";
import { systems_v1_select_Reducer } from "./api/staticPage/systems/systems_v1_select/reducer";
import { creadit_v1_select_actions_Reducer } from "./api/staticPage/creadit/creadit_v1_select/reducer";
import { about_us_v1_select_actions_Reducer } from "./api/staticPage/about_us/about_us_v1_select/reducer";
import { registration_guide_v1_select_Reducer } from "./api/staticPage/registration_guide/registration_guide_v1_select/reducer";
import { Brochures_v1_select_actions_Reducer } from "./api/staticPage/Brochures/Brochures_v1_select/reducer";
import { ipo_v1_select_Reducer } from "./api/staticPage/Ipo/Ipo_v1_select/reducer";
import { education_software_v1_select_Reducer } from "./api/staticPage/education_software/education_software_v1_select/reducer";
import { branches_v1_select_Reducer } from "./api/Branches/Branches_v1_select/reducer";
import { post_v1_information_Reducer } from "./api/post-forum/post/post_v1_information/reducer";
import { stock_v1_reducer } from "./api/profile/stock/stock_v1_select/reducer";
import { profile_v1_reducer } from "./api/profile/person/person_v1_select/reducer";
import { profile_v1_reducer_intruducing } from "./api/profile/person/person_v1_select_introducing/reducer";
import { orders_select_Reducer } from "./api/profile/Orders/orders_v1_select/reducer";
import { orders_v1_select_aggregates_Reducer } from "./api/profile/Orders/orders_v1_select_aggregates/reducer";
import { Courses_v1_select_Reducer } from "./api/Definitions/EducationCourses/Courses_v1_select/reducer";
import { creadit_profile_v1_reducer } from "./api/profile/creadit/credit_v1_select/reducer";
import { registeration_v1_select_insert } from "./api/Definitions/EducationCourses/registration_v1_insert/reducer";
import { gift_v1_select_registration_Reducer } from "./api/Definitions/gift/gift _v1_registrations/reducer";
import { gift_v1_select_Reducer } from "./api/Definitions/gift/gift_v1_select/reducer";
import { gift_v1_select_Reducer_categories } from "./api/Definitions/gift/gift_v1_active_categories/reducer";
import { gift_v1_select_Reducer_subcategories } from "./api/Definitions/gift/gift_v1_active_subcategories/reducer";
import { gift_v1_select_active_name_Reducer } from "./api/Definitions/gift/gift_v1__select_active_name/reducer";
import { giftAggregated_v1_select_reducer } from "./api/Definitions/gift/giftAggregated_v1_select/reducer";
import { giftCashAggregated_v1_select_reducer } from "./api/Definitions/gift/giftCashAggregated_v1_select/reducer";
import { giftCash_v1_select_Reducer } from "./api/Definitions/gift/giftCash_v1_select/reducer";
import { gift_v1_select_finalize_bulk_registration_Reducer } from "./api/Definitions/gift/gift_v1_finalize_bulk_registration/reducer";
import { subscription_signal_v1_select_Reducer } from "./api/signalHafez/SubscriptionPlans/reducer";
import { signal_hafez_v1_select_Reducer } from "./api/signalHafez/signals/reducer";
import { signal_document_hafez_v1_select_Reducer } from "./api/signalHafez/signals/detail_document/reducer";
import { member_subscriptions_hafez_v1_select_Reducer } from "./api/signalHafez/memberSubscriptions/reducer";
import { discountCode_v1_select_reducer } from './api/Definitions/gift/discountCode_v1_select/reducer';
import { stepbystep_discount_Reducer } from './api/stepByStepDiscount/sector_v1_select/reducer';
import { bonus_v1_select_Reducer } from "./api/Definitions/bonus/bonus_v1_select/reducer";
import { bonus_aggregated_v1_select_Reducer } from "./api/Definitions/bonus/BonusAggregated_v1_select/reducer";
import { bonus_select_mengement_reducer } from "./api/Definitions/bonus/bonus_v1_select_bonusMangement/reducer";
import { bonus_calculate_confiict_reducer } from "./api/Definitions/bonus/bonus_v1_calculate_conflict/reducer";
import { bonus_select_confiict_reducer } from "./api/Definitions/bonus/bonus_v1_select_conflicts/reducer";
import { competitions_v1_select_Reducer } from "./api/Definitions/Compatitions/competitions_v1_select/reducer";
import { competitions_v1_select_in_range_Reducer } from "./api/Definitions/Compatitions/competitions_v1_select_in_range/reducer";
import { performance_v1_select_by_id_Reducer } from "./api/Definitions/Compatitions/performance_v1_select_by_id/reducer";
import { participations_v1_select_Reducer } from "./api/Definitions/Compatitions/participations_v1_select/reducer";
import { competitions_profile_v1_reducer } from "./api/Definitions/Compatitions/person_v1_select/reducer";
import { Notify_v1_select_Reducer } from "./api/Dossier/Notify/Notify_v1_select/reducer";
import { select_ipo_list_title_reducer } from "./api/Definitions/ipoLIst/select_ipos/reducer";
import { select_user_status_reducer } from './api/Definitions/ipoLIst/select_user_status/reducer';
import { select_ipoList_excel_reducer } from "./api/Definitions/ipoLIst/Excel_ipo/reducer";
import { person_v1_select_Integrate_profiles_reducer } from "./api/profile/person/person_v1_select_Integrate_profiles/reducer";
import { bonus_request_v1_select_Reducer } from "./api/Definitions/bonus/bonus_v1_requests/reducer";

import { stock_select_summaries_reducer } from "./api/profile/summaries/reducer";
import { stock_select_searchsymbol_reducer } from "./api/profile/summaries/stock_searchSymbol_select/reducer";

import { management_data_stock_Reducer } from "./api/stock/mangement_data_stock/stock_v1_select/reducer";
import { management_data_sector_Reducer } from "./api/stock/sector_data_stock/sector_v1_select/reducer";
import { usersList_v1_list_Reducer } from "./api/usersList/users_v1_list/reducer";

import { customer_select_reducer } from "./api/customersRequest/reducer";
import { customer_v1_select_attachments_reducer } from "./api/customersRequest/ModalRequest/reducer";
import { excel_list_all_reducer } from "./api/Excel/reducer";
import { select_stock_details_reducer } from "./api/profile/stock/stock_value/reducer";
import { changeBroker_v1_select_Reducer } from './api/stock/changeBroker/reducer';

import { select_portfolio_remain_reducer } from "./api/profile/stock/stock_remain/reducer";
import { introduction_v1_select_reducer } from './api/profile/person/person_v1_introducing_details/reducer';
import {change_introducer_v1_reducer} from "./api/profile/person/person_v1_changeIntroducing/reducer";
import {reducer_get_kyc_profile} from './api/profile/person/clubmember_select_get_kyc_profile/reducer';
import {logInList_select_reducer} from './api/LogInlist/reducer'



import { select_total_bonus_reducer } from './api/generalStatistics/select_total_bonus/reducer';
import { select_clubmember_count_reducer } from './api/generalStatistics/select_clubmember_count/reducer';
import { select_clubmember_registration_count_reducer } from './api/generalStatistics/select_clubmember_registration_count/reducer';
import { select_clubmember_by_bourse_code_count_reducer } from './api/generalStatistics/select_clubmember_by_bourse_code_count/reducer';
import { select_clubmember_daily_login_log_reducer } from './api/generalStatistics/select_clubmember_daily_login_log/reducer';


import {work_with_us_select} from "./api/FormManager/workWithUs/reducer";
import {workwithus_v1_select_attachments_reducer} from "./api/FormManager/workWithUs/Attachments/reducer";
import {workwithus_v1_update_reducer} from "./api/FormManager/workWithUs/update/reducer";

import { marketer_select } from "./api/Form Manager/Marketer/reducer";
import { marketer_v1_select_attachments_reducer } from "./api/Form Manager/Marketer/Attachments/reducer";

import { contactus_select_reducer } from "./api/Form Manager/Contactus/reducer";

import { contactus_v1_select_details_reducer } from "./api/Form Manager/Contactus/Details/reducer";
import { payments_v1_select_reducer } from "./api/payments/payments_v1_select/reducer";
import {stockCash_select_reducer} from "./api/stock/stockCash/stockCash_select/reducer"


const appReducer = combineReducers({
  // excel
  excel_list_all_reducer,
  reducers_alert,
  //static
  SideBarReducer,
  club_member_v1_reducer,
  clubmember_select_reducer,

  //api
  login_v1_Reducer,
  branches_v1_select_Reducer,

  //difination

  select_ipo_list_reducer,
  select_ipo_list_title_reducer,
  select_user_status_reducer,
  select_ipoList_excel_reducer,
  person_v1_select_Integrate_profiles_reducer,
  stock_select_summaries_reducer,
  stock_select_searchsymbol_reducer,
  management_data_stock_Reducer,
  management_data_sector_Reducer,

  education_video_v1_select_Reducer,
  ACCOUNTS_v1_select_Reducer,
  JobsOpportunities_v1_select_Reducer,
  systems_v1_select_Reducer,
  registration_guide_v1_select_Reducer,
  telegram_link_v1_select_Reducer,
  creadit_v1_select_actions_Reducer,
  about_us_v1_select_actions_Reducer,
  Brochures_v1_select_actions_Reducer,
  ipo_v1_select_Reducer,
  education_software_v1_select_Reducer,
  forum_v1_select_Reducer,
  post_v1_select_Reducer,
  comments_v1_select_Reducer,
  post_v1_information_Reducer,
  post_v1_select_Reducer_filter,
  stock_v1_reducer,
  profile_v1_reducer,
  profile_v1_reducer_intruducing,
  orders_select_Reducer,
  orders_v1_select_aggregates_Reducer,
  creadit_profile_v1_reducer,
  Courses_v1_select_Reducer,
  registeration_v1_select_insert,
  gift_v1_select_registration_Reducer,
  gift_v1_select_Reducer,
  gift_v1_select_Reducer_categories,
  gift_v1_select_Reducer_subcategories,
  gift_v1_select_active_name_Reducer,
  giftAggregated_v1_select_reducer,
  giftCashAggregated_v1_select_reducer,
  giftCash_v1_select_Reducer,
  gift_v1_select_finalize_bulk_registration_Reducer,
  subscription_signal_v1_select_Reducer,
  signal_hafez_v1_select_Reducer,
  signal_document_hafez_v1_select_Reducer,
  member_subscriptions_hafez_v1_select_Reducer,
  discountCode_v1_select_reducer,
  stepbystep_discount_Reducer,
  bonus_request_v1_select_Reducer,

  //difination
  registeration_v1_select_Reducer,
  feedback_v1_select_Reducer,
  faq_v1_select_Reducer,
  pishkhan_v1_select_Reducer,
  slider_v1_select_Reducer,

  bonus_v1_select_Reducer,
  bonus_aggregated_v1_select_Reducer,
  bonus_select_mengement_reducer,
  bonus_calculate_confiict_reducer,
  bonus_select_confiict_reducer,
  
  competitions_v1_select_Reducer,
  competitions_v1_select_in_range_Reducer,
  performance_v1_select_by_id_Reducer,
  participations_v1_select_Reducer,
  competitions_profile_v1_reducer,
  Notify_v1_select_Reducer,
  usersList_v1_list_Reducer,
  customer_v1_select_attachments_reducer,
  customer_select_reducer,
  select_stock_details_reducer,
  changeBroker_v1_select_Reducer,
  select_portfolio_remain_reducer,
  introduction_v1_select_reducer,
  change_introducer_v1_reducer,
  reducer_get_kyc_profile,

  select_total_bonus_reducer,
  select_clubmember_count_reducer,
  select_clubmember_registration_count_reducer,
  select_clubmember_daily_login_log_reducer,
  select_clubmember_by_bourse_code_count_reducer,
  logInList_select_reducer,
  work_with_us_select,
  workwithus_v1_select_attachments_reducer,
  workwithus_v1_update_reducer,
  marketer_v1_select_attachments_reducer,
  marketer_select,
  contactus_select_reducer,
  contactus_v1_select_details_reducer,
  payments_v1_select_reducer,
  stockCash_select_reducer
});

export const rootReducer = (state, action) => {
  if (action.type === ERROR405) {
    state = undefined;
  }
  return appReducer(state, action);
};
