import React  from 'react';
import './index.scss';
import Styles from './index.module.scss';
import SideBar from '../Containers/Common/Components/SideBar';
import Login from '../Containers/page/Login';

import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../Assetss/CustomTheme';

import {useDispatch , useSelector} from 'react-redux'
import {login_v1_actions} from '../boot/api/login_v1/action'



const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function Index (){

    const dispatch = useDispatch();
    const data = useSelector(state => state.login_v1_Reducer)



    const handelSubmit = (data)=>{
        dispatch(login_v1_actions(data))
    }


    return(
        <ThemeProvider theme={theme}>
            <StylesProvider jss={jss}>   
                <div className={Styles['root']}>  
           
                        {
                        data.isAuthenticates&&(
                            <>
                                {
                                    // data.isAuthenticates.token &&
                                    data.isAuthenticates.token.length>4 &&
                                    data.isAuthenticates.member_id &&
                                    (
                                        <SideBar key={'1'} /> 
                                    )
                                }
                            </>
                        )
                    }
                    { 
                        !data.isAuthenticates&&(
                            <Login dataReducer={data} handelSubmit={handelSubmit} />
                        )
                    }
  
     
                </div>
            </StylesProvider>
        </ThemeProvider>
    )
}