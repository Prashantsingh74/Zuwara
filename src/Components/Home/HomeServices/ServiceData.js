import React from 'react'
import '../../../Style/Home.css'
import { useTranslation } from 'react-i18next'

function ServiceData(props) {
    const { t } = useTranslation();

    return (
        <>
            <img src={props.Image} alt="services" title={props.Title} />
            <span className='poppins-regular zwaara_sr'>{t(`${props.Title}`)}</span>
        </>
    )
}

export default ServiceData
