import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { permitted_methods } from '../../Common/method/permitted_method';
import { getSessionParam } from '../../Common/method/getSessionParam';

const useStyles = makeStyles({
    Container: {
        height: "93vh",
        direction: "ltr",
        borderRadius: 10,
        backgroundColor:'#EEF0F8'
    },
    cardLogo:{
        width:'100%',
        textAlign:'center',
        paddingTop:'5%'
    },
    grid:{
        width:'95%',
        height:'auto',
        minHeight:300,
        margin:'auto',
        backgroundColor:'white',
        marginTop:40,
        padding:20,
        borderRadius: 10,
    },
    content:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexWrap:'wrap',
    },
    cardTitle:{
            width:'50%',
            height:45,
            textAlign:'left'
    },
    title:{
        width:300,
        margin:'auto',
        '&:hover > a':{
            color:'#3699FF'
        }
    },
});


export default function Index() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [regex, setRegex] = useState("")

    useEffect(() => {
        let member_permitted_methods = getSessionParam("member_permitted_methods")

        setRegex(permitted_methods(member_permitted_methods))
      }, [])
    


    const data =[
        {title:'صدای مشتری' , link:'/Feedback', indexPage:1 , disabled :  ConvertToUpperCase("feedback.").match(regex) ? false : true },
        {title:'جوایز' , link:'/Gift' ,  indexPage:2 ,disabled :  ConvertToUpperCase("gift.").match(regex) ? false : true },
        {title:'اعلانات' , link:'/Notify' ,  indexPage:4 , disabled :  ConvertToUpperCase("notification.").match(regex) ? false : true },
        {title:'اسلایدر' , link:'/Slider' ,  indexPage:1 ,  disabled :  ConvertToUpperCase("static.").match(regex) ? false : true},
        {title:'پست ها' , link:'/Posts' ,  indexPage:4 , disabled :  ConvertToUpperCase("post.").match(regex) ? false : true},
        {title:'پروفایل شخص' , link:'/Profile' ,  indexPage:4, disabled :  ConvertToUpperCase("clubmember.").match(regex) ? false : true },
    ]

    return (
        <div className={classes.Container}>
            <div className={classes.cardLogo}>
                <img className={classes['logo']} src='/assets/images/LogoMobinEnd.png' alt='' onClick={()=>dispatch({type:'ERRO_RALERT'  , payload:'خطا در ارتباط با سرور'})}  />
                <h1>پنل مدیریت باشگاه مشتریان شرکت کارگزاری مبین سرمایه</h1>
            </div>
            <div className={classes['grid']}>
                <h2>دسترسی سریع</h2>
                <div className={classes['content']}>
                    {
                        data.map((data,index)=>{
                            return(
                            <div className={classes['cardTitle']} key={index}>
                                <h3 className={classes['title']} key={index}
                                //  onClick={()=>{handelIndex(data.indexPage)}}
                                 > 
                                    <Link className={data.disabled ? "disabledItems" : ""}  to={data.link}>
                                        {data.title}
                                    </Link>
                                </h3>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}



let ConvertToUpperCase = (item) => {
    return item.toUpperCase()
  }
