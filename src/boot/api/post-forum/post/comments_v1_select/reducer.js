import {
    COMMENTS_V1_SELECT , COMMENTS_V1_EMPTY
} from "../../../typeActions";


const initState = {
    data: []
}


export const comments_v1_select_Reducer = (state = initState, { type, payload  , id}) => {

    switch (type) {
        case COMMENTS_V1_SELECT:
            let length = state.data.length

            if(length === 0){
                return{
                    data : [
                        {
                            id:id,
                            body:payload
                        }
                    ]
                }
            }


             let flag = true
            let res = state.data.map((items)=>{
                    if(items.id === id){
                        flag = false
                        return {
                            id:id,
                            body:payload
                        }
                    }
                return items
                })

            if(length > 0 && !flag){
                return {data : [...res]}
            }

            if(length > 0 && flag){
            
                  return {
                      data :[
                          ...state.data ,
                          {
                            id:id,
                            body:payload
                           }
                        ]
                    } 
        
            }

            return state

        case COMMENTS_V1_EMPTY :
            return { data: [] }
        default:
            return state;
    }
}
