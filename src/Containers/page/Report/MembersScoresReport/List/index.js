import React from 'react'
import Styles from './index.module.scss';

import {BoxInline} from '../../../../Common/Components/StylesComponents/index';

export default function Index() {
    return (
        <div className={Styles['BoxInline']}>

            <BoxInline right>
                <h3>لیست نظرات</h3>
            </BoxInline>

            <BoxInline left>
                <h3>لیست پاسخ ها</h3>
            </BoxInline>
        </div>
    )
}
