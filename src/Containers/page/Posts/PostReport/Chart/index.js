import React from 'react'
import Styles from './index.module.scss';

import {Bar} from 'react-chartjs-2';

export default function Index() {

    const state = {
        labels: ['سه شنبه', 'چهارشنبه', 'پنجشنبه',
                 'جمعه', 'شنبه'],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: '#3699FF',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 1,
            data: [65, 59, 80, 81, 56]
          }
        ]
      }

    return (
        <div className={Styles['chart']}>
            <div className={Styles['bar']}>
                <Bar
                    data={state}
                    options={{
                        title: {
                            display: false,
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                    zeroLineColor: 'transparent'
                                }
                            }],
                            yAxes: [{
                                display: false,
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                }   
                            }]
                        } 
                    }}
                    />
            </div>

        </div>
    )
}
