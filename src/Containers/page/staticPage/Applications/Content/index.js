import React from 'react';
import Styles from './index.module.scss';
import Card from './Card';



export default function Index({ data, category, handleUpdate }) {


    const handelChange = (_data) => {
        handleUpdate(_data)
    }


    return (
        <div className={Styles['content']}>
            {
                category.map((item, index) => {
                    return (
                        <Card
                            category={item}
                            data={data}
                            key={index}
                            index={index}
                            handelChange={handelChange}
                            
                        />
                    )
                })
            }

        </div>
    )
}
