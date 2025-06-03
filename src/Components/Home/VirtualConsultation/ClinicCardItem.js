import React from 'react'
import '../../../Style/Home.css'


function ClinicCardItem(props) {
    return (
        <>
            <div className='virtual-card'>
                <figure>
                    <div style={{ backgroundImage: `url(${props.image})` }} className='z-clinic-img'></div>
                    {/* <img src={props.image} alt='Clinic Card img' className='z-clinic-img z-mob-none' /> */}
                </figure>
                <div className='z-clinic-det'>
                    <div className='z-clinic-det-tit'>
                        <h6 className='poppins-semibold zw_22 zw_text_color'>{props.title}</h6>
                        <p className='poppins-regular zw_18 zw_secondary'>{props.name}</p>
                        <button className='btn-conti poppins-regular zw_14 zw_text_fff' style={{borderRadius:'11px'}}>Continue</button>

                        {/* <div className='z-clinic-arrow'>
                        <i className='icon-right-arrow-thick'></i>
                    </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClinicCardItem
