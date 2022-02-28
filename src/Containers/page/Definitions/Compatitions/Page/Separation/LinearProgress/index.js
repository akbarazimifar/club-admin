import React , {useEffect , useState} from 'react';
import { makeStyles , withStyles  } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflow:'auto'
    },
    cardLinearProgress:{
        padding:'15px 30px',
        border:'0.2px solid rgba(0,0,0,0.2)',
        boxShadow:'0 0 10px #DDDDDD',
        marginTop:10,
        marginBottom:10,
        borderRadius:5,
        lineHeight:0,
        cursor:'pointer',
        '&:hover':{
            // backgroundColor :'lightgray',
        },

    }
});

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 8,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);



export default function LinearDeterminate({
    idCompetitions,
    reducerPerformanceById,
    apisperformanceSelectById,
    apiParticipationsByIdEmpty,
    apiParticipationsSelect,
    apiParticipationsEmpty,
}) {
    
    const classes = useStyles();
    const [state, setstate] = useState([])
    const [selectItems , setSelectItmes] = useState(0)

    /////////////////////////////////// api performance By Id  Select ///////////////////////////////////////

    useEffect(() => {
        if(idCompetitions){
            let obj ={
                _id : idCompetitions
            }

            apisperformanceSelectById(obj)

        }

        return () => {
            apiParticipationsByIdEmpty()
            setstate([])
        }

    }, [idCompetitions]) //eslint-disable-line react-hooks/exhaustive-deps

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////// state answer ////////////////////////////////////////////////////

    useEffect(() => {

        if(reducerPerformanceById.data[0]){

            let answare = []
            let freqs = JSON.parse(reducerPerformanceById.data[0].body.freqs)

                for (let i = 0; i < 10; i++) {
                    if(reducerPerformanceById.data[0].body[`answer_${i + 1}`] !== "null"){
                        answare.push({
                            value: reducerPerformanceById.data[0].body[`answer_${i + 1}`],
                            freqs: freqs[i],
                            index : i + 1,
                        })
                    }
                }
                setstate(answare)
        }
       
    }, [reducerPerformanceById.data])//eslint-disable-line react-hooks/exhaustive-deps

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////// api performance filter choice_number Select ///////////////////////////////

    useEffect(() => {

        /////// select defaulte index 1 api performance ////////////
        if(idCompetitions){
            if(reducerPerformanceById.data.length !== 0){
                
                let obj = {
                    index : 1
                }
                 handelChoice_number(obj)
            }
        }

    }, [reducerPerformanceById])//eslint-disable-line react-hooks/exhaustive-deps

    const handelChoice_number = (data)=>{

        apiParticipationsEmpty()

        let obj = {
            choice_number: data.index,
            competition_id : idCompetitions
        }
        let flagSaveData = true

        apiParticipationsSelect(obj,flagSaveData)

        setSelectItmes(data.index -1 )
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////



    return (
        <div className={classes.root}>
            {
                state.map((data,index)=>{
                    return(
                        <div 
                            key={index}
                            style={{backgroundColor: selectItems === index ? 'lightgray' : 'white'}}
                            className={classes['cardLinearProgress']}
                            onClick={()=>handelChoice_number(data)}>
                            <p style={{whiteSpace:'normal !important'}}>{data.value}</p>
                            <BorderLinearProgress variant="determinate" value={data.freqs} />
                            <div style={{marginTop:10,fontSize:11}}>{data.freqs.toFixed(1)}%</div>
                        </div>
                    )
                })
            }          
        </div>
    );
}
