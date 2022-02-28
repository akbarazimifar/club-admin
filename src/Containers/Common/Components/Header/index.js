import React from 'react'
import Styles from './index.module.scss';
import {
    Link, useLocation
} from "react-router-dom";


export default function Index({ data }) {

    let { pathname } = useLocation();

    return (
        <div className={Styles['nav']}>
            <ul className={Styles['list']}>
                {
                    data.list.map((items, index) => {
                        if (!items.api) {
                            return (
                                <Link
                                    to={items.link}
                                    key={index}
                                    className="disabledItems"
                                >
                                    <li
                                        key={index}
                                        style={{ color: pathname === items.link ? '#3699FF' : '#ccc' }}
                                    > {items.title}</li>
                                </Link>
                            )
                        }
                        return (
                            <Link to={items.link} key={index}>
                                <li key={index} style={{ color: pathname === items.link ? '#3699FF' : '' }}> {items.title}</li>
                            </Link>
                        )

                    })
                }
            </ul>
        </div>
    )
}
