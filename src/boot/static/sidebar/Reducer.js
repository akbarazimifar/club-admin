import {
    HomeSideBar ,
    } from "../typeActions";


const initState = {

 sidebar :[
    {
        title:'' ,
        list:[

        ] ,
        link:''
    },
    {
        title:'' ,
        list:[

        ] ,
        link:''
    },
    {
        title:'' ,
        list:[

        ] ,
        link:''
    },
    {
        title:'' ,
        list:[

        ] ,
        link:''
    },
    {
        title:'' ,
        list:[

        ] ,
        link:''
    },
 ]
}


export const SideBarReducer = (state = initState, { type , payload }) => {

    switch (type) {
        case HomeSideBar:
            return {
                ...state , 
                sidebar : payload
            };

        default:
            return state;
    }
}
