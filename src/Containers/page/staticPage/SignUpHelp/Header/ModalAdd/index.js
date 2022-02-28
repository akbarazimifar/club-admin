import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextEditorQuill from "./../../../../../Common/Components/TextEditorQuill";
import { registration_guide_v1_update_actions } from "./../../../../../../boot/api/staticPage/registration_guide/registration_guide_v1_update/action"
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    ModalAdd: {
        width: "70%",
        borderRadius: 8,
        padding: 15,
        backgroundColor: "whitesmoke",
    },
    root: {
        padding: "20px 0",
        height: 600,
        width: "90%",
        margin: "auto",
        '& .MuiBox-root': {
            margin: theme.spacing(1),

        },
    },
    btns: {
        margin: "0px 0 10px 0",
        textAlign: "right",
        width: "95%",
    }
}));

export default function Index({ setNewButton, Content, id }) {
    const classes = useStyles();
    const [dataTextEditor, setDataTextEditor] = useState("");
    const dispatch = useDispatch();


    const handleSubmitUpdate = () => {
        // console.log(JSON.stringify({ content: dataTextEditor }), id );
        
        dispatch(registration_guide_v1_update_actions(JSON.stringify({ content: dataTextEditor }), id))
        // dispatch(registration_guide_v1_update_actions(dataStatic ,id))
        // alert('ویرایش اطلاعات فعلا امکان پذیر نمی باشد')
        setNewButton(false)
    }


    return (
        <div className={classes['ModalAdd']}>

            <div className={classes['root']}>
                <div>

                    <Box
                        width="100%"
                        height="600px"
                    >
                        <TextEditorQuill answerDataEdit={Content} >
                            {data => setDataTextEditor(data)}
                        </TextEditorQuill>

                    </Box>

                </div>

            </div>

            <div className={classes['btns']}>
                <button
                    className={'btnsGreen'}
                    onClick={handleSubmitUpdate}
                >ذخیره </button>
                <button className={'btnsRed'} onClick={() => setNewButton(false)}>انصراف </button>
            </div>
        </div>
    )
}



// let dataStatic = "{\"content\":\"\\r\\n                <div class=\\\"row\\\">\\r\\n                    <div class=\\\"center\\\">\\r\\n                        <a class=\\\"btn btn-app btn-small btn-light no-hover\\\" href=\\\"#step1\\\">\\r\\n                            <span class=\\\"bigger-90 blue\\\"> گام اول </span>\\r\\n                            <br>\\r\\n                            <span class=\\\"smaller-90\\\"> ثبت درخواست </span>\\r\\n                        </a>\\r\\n                        <a class=\\\"btn btn-app btn-small btn-yellow no-hover\\\" href=\\\"#step2\\\">\\r\\n                            <span class=\\\"bigger-90\\\"> گام دوم </span>\\r\\n                            <br>\\r\\n                            <span class=\\\"smaller-90\\\"> تکمیل فرم  </span>\\r\\n                        </a>\\r\\n                        <a class=\\\"btn btn-app btn-small btn-pink no-hover\\\" href=\\\"#step3\\\">\\r\\n                            <span class=\\\"bigger-90\\\"> گام سوم </span>\\r\\n                            <br>\\r\\n                            <span class=\\\"smaller-90\\\"> ثبت نام   </span>\\r\\n                        </a>\\r\\n                        <a class=\\\"btn btn-app btn-small btn-grey no-hover\\\" href=\\\"#step4\\\">\\r\\n                            <span class=\\\"bigger-90\\\"> گام چهارم </span>\\r\\n                            <br>\\r\\n                            <span class=\\\"smaller-90\\\"> ورود  </span>\\r\\n                        </a>\\r\\n                        <a class=\\\"btn btn-app btn-small btn-success no-hover\\\" href=\\\"/Customer/Help\\\" title=\\\"راهنمای ثبت نام مشتریان\\\">\\r\\n                            <span class=\\\"bigger-90\\\"> مشتری شوید </span>\\r\\n                            <br>\\r\\n                            <span class=\\\"smaller-90\\\"> راهنما </span>\\r\\n                        </a>\\r\\n                    </div>\\r\\n                </div>\\r\\n                <div class=\\\"row\\\">\\r\\n                \\r\\n                    <div class=\\\"span12\\\">\\r\\n                        <a name=\\\"step1\\\"></a>\\r\\n                        <h3>گام اول : ثبت درخواست عضویت</h3>\\r\\n                        <p>\\r\\n                            وارد سایت باشگاه مشتریان مبین سرمایه شوید. آدرس سایت <a href=\\\"Http://www.Club.Mobinsb.com\\\">Http://www.Club.Mobinsb.com</a> می باشد. در  بخش ورد به سایت بر روی لینک ثبت نام کلیک نمایید.\\r\\n                        </p>\\r\\n                        <img src=\\\"http://club.mobinsb.com/Images/Register/User/register-01.JPG\\\" class=\\\"img-responsive\\\">\\r\\n\\r\\n                        <a name=\\\"step2\\\"></a>\\r\\n                        <h3>گام دوم : تکمیل فرم درخواست</h3>\\r\\n                        <p>\\r\\n\\r\\n                            در این بخش لازم است ، تا فرم ثبت درخواست عضویت را پر نمایید پس از اینکه در خواست عضویت با موفقیت ثبت گردید. در ادامه لینک ثبت نام در باشگاه مشتریان به ایمیل شما ارسال یا کد فعال سازی به تلفن همراه شما پیامک می شود.\\r\\n\\r\\n                        </p>\\r\\n                        <h4> تکیمل فرم درخواست عضویت در باشگاه :</h4>\\r\\n\\r\\n                        <img src=\\\"http://club.mobinsb.com/Images/Register/User/register-02.JPG\\\" class=\\\"img-responsive\\\">\\r\\n\\r\\n                        <ul style=\\\"list-style-type: decimal\\\">\\r\\n                            <li> در ابتدا می بایست نوع کاربری خود ( حقیقی – حقوقی) را مشخص نمایید.</li>\\r\\n                            <li>\\r\\n                                چنانچه کاربر حقیقی هستید کد ملی و چنانچه کاربر حقوقی هستید شناسه حقوقی را وارد نمایید.\\r\\n                                <div class=\\\"row\\\">\\r\\n                                    <i class=\\\"green\\\">\\r\\n                                        چنانچه مشتری ما هستید ولی عضو باشگاه مشتریان نمی باشید ، پس از وارد کردن کدملی/شناسه حقوقی ، نشانی پست الکترونیک شما در بالای فرم نمایش داده خواهد شد\\r\\n                                    </i>\\r\\n                                </div>\\r\\n                            </li>\\r\\n                            <li>\\r\\n                                آدرس پست الکترونیک خود را وارد نمایید.\\r\\n                                <div class=\\\"row\\\">\\r\\n                                    <i class=\\\"green\\\">\\r\\n                                        چنانچه مشتری مبین سرمایه هستید در صورتی که پیش از این پست الکترونیک خود را ثبت کرده اید ، می توانید آنرا در مرحله قبل مشاهده و وارد نمایید\\r\\n                                    </i>\\r\\n                                </div>\\r\\n                            </li>\\r\\n                            <li> تلفن همراه خود را وارد نمایید</li>\\r\\n                            <li>\\r\\n                                در صورتی که توسط کاربر دیگری معرفی شده اید می توانید ایشان را در این بخش معرفی کنید\\r\\n                                <div class=\\\"row\\\">\\r\\n                                    <i class=\\\"green\\\">\\r\\n                                        برای این منظور کد ملی/شناسه حقوقی یا شناسه معرف در باشگاه مشتریان مبین سرمایه را وارد نمایید.\\r\\n                                    </i>\\r\\n                                </div>\\r\\n                                <div class=\\\"row\\\">\\r\\n\\r\\n                                    <p class=\\\"important\\\">\\r\\n                                        اعضای باشگاه مشتریان مبین سرمایه می توانند با ورود به صفحه پروفایل ، شناسه خود در باشگاه مشتریان را مشاهده نمایند و آنرا جهت ثبت در مرحله بالا به اطلاع سایر دوستان خود برسانند.\\r\\n                                    </p>\\r\\n                                    <img src=\\\"http://club.mobinsb.com/Images/Register/User/register-03.JPG\\\" class=\\\"img-responsive\\\">\\r\\n                                </div>\\r\\n                            </li>\\r\\n                            <li> کد امنیتی را وارد نمایید</li>\\r\\n                            <li> بر روی ارسال در خواست کلیک نمایید</li>\\r\\n                        </ul>\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n                        <a name=\\\"step3\\\"></a>\\r\\n                        <h3>گام سوم : ثبت نام در باشگاه مشتریان</h3>\\r\\n                        <p>\\r\\n                            برای ورود به بخش ثبت نام دو مسیر وجود دارد. چنانچه پیش از این ذکر شد ، پس از ثبت درخواست عضویت لینک عضویت در باشگاه مشتریان به ایمیل شما ارسال می شود. همچنین یک کد فعال سازی به شماره همراه شما پیامک می شود.\\r\\n                        </p>\\r\\n                        <h4>ثبت نام از طریق لینک عضویت : </h4>\\r\\n                        <p>پس از ورود به صندوق پست الکترونیکی خود ، ایمیل دریافتی از باشگاه مشتریان را باز نمایید و بر روی لینک دریافتی کلیک کنید این لینک شما را به صفحه ثبت نام عضو جدید هدایت می کند.</p>\\r\\n                        <h4>ثبت نام از طریق کد فعال سازی : </h4>\\r\\n                        <p>چنانچه می خواهید از طریق کد فعال سازی که به تلفن همراهتان پیامک شده است ، اقدام به ثبت نام کنید در بخش ورود به سایت ، بر روی لینک وارد کردن کد فعال سازی کلیک نمایید .</p>\\r\\n\\r\\n\\r\\n                        <img src=\\\"http://club.mobinsb.com/Images/Register/User/register-04.JPG\\\" class=\\\"img-responsive\\\">\\r\\n                        <p>در ادامه فرایند ثبت نام ، فرم فعال سازی کاربر در صفحه جدید را تکمیل نمایید.</p>\\r\\n                        <img src=\\\"http://club.mobinsb.com/Images/Register/User/register-05.JPG\\\" class=\\\"img-responsive\\\">\\r\\n\\r\\n                        <ul style=\\\"list-style-type: decimal\\\">\\r\\n                            <li> نوع کاربری خود را (حقیقی-حقوقی) را انتخاب نمایید.</li>\\r\\n                            <li> کد ملی/ شناسه حقوقی خود را وارد نمایید.</li>\\r\\n                            <li> کد 5 رقمی دریافتی توسط ایمیل یا پیامک را وارد نمایید.</li>\\r\\n                            <li> کد امنیتی را وارد نمایید.</li>\\r\\n                            <li> بر روی دکمه فعال سازی کاربر کلیک نمایید.</li>\\r\\n                        </ul>\\r\\n\\r\\n                        <i class=\\\"green\\\">\\r\\n                            لازم به ذکر است اطلاعات وارد شده در فرم بالا می بایست مطابق با اطلاعات ثبت شده در زمان درخواست عضویت در باشگاه باشد\\r\\n                        </i>\\r\\n                        <p>چنانچه کد وارد شده معتبر بود ، به صفحه ثبت نام عضو جدید هدایت می شوید.</p>\\r\\n                        <i class=\\\"green\\\">\\r\\n                            با توجه به نوع کاربر حقیقی/حقوقی فرم ثبت نام متفاوت خواهد بود که با کادر سبز رنگ نمایش داده شده است.\\r\\n                            به راهنمای تعیین شناسه کاربری که با رنگ آبی قابل مشاهده است توجه نمایید.\\r\\n\\r\\n                        </i>\\r\\n                        <h4>فرم ثبت نام کاربر حقیقی را در زیر مشاهده می کنید :</h4>\\r\\n                        <img src=\\\"http://club.mobinsb.com/Images/Register/User/registrer-06.JPG\\\" class=\\\"img-responsive\\\">\\r\\n                        <h4>فرم ثبت نام کاربر حقوقی را در زیر مشاهده می کنید :</h4>\\r\\n                        <img src=\\\"http://club.mobinsb.com/Images/Register/User/registrer-07.JPG\\\" class=\\\"img-responsive\\\">\\r\\n                        <p>\\r\\n                            پس از تکمیل فرم بر روی دکمه ثبت نام کلیک کنید تا ثبت نام شما نهایی شده و پیغام موفقیت در ثبت نام نمایش داده شود.\\r\\n                        </p>\\r\\n                        <img src=\\\"http://club.mobinsb.com/Images/Register/User/register-08.JPG\\\" class=\\\"img-responsive\\\">\\r\\n\\r\\n                        <a name=\\\"step4\\\"></a>\\r\\n                        <h3>گام چهارم : ورود به سایت</h3>\\r\\n                        <p>پس از ثبت نام می توانید به عنوان عضوی از باشگاه مشتریان ، وارد سایت شوید .</p>\\r\\n                        <img src=\\\"http://club.mobinsb.com/Images/Register/User/register-09.jpg\\\" class=\\\"img-responsive\\\">\\r\\n                        <p>\\r\\n                            در صفحه ورود به سایت می توانید با استفاده از شناسه کاربری / کد ملی یا شناسه حقوقی و یا آدرس پست الکترونیک همچنین رمز عبور که در مرحله ثبت نام تعیین کرده اید ، وارد سایت شوید\\r\\n                        </p>\\r\\n                        <img src=\\\"http://club.mobinsb.com/Images/Register/User/registrer-10.JPG\\\" class=\\\"img-responsive\\\">\\r\\n                       \\r\\n                        <p>\\r\\n                            <b class=\\\"green\\\">به باشگاه مشتریان مبین سرمایه خوش آمدید</b>\\r\\n                            <br>\\r\\n                            چنانچه می خواهید به مشتریان کارگزاری مبین سرمایه بپیوندید ، بر روی لینک زیر کلیک کنید.\\r\\n                            <a href=\\\"/Customer/Help\\\" title=\\\"راهنمای ثبت نام مشتری\\\">راهنمای ثبت نام مشتریان </a>\\r\\n                        </p>\\r\\n                    </div>\\r\\n\\r\\n                </div>\\r\\n\"}"


// let parsData = JSON.parse(dataStatic)