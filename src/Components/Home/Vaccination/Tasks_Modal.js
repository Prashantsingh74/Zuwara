import React from 'react'
import '../../../Style/Vaccination.css';
import { data } from './Center_Vaccina.js';

function Tasks_Modal() {
    const Vaccination_items = "";

    return (
        <div className="modal fade" id="Tasks_Modal" data-bs-backdrop='static' role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <button className="z-sign-btn" data-bs-dismiss="modal" aria-label="Close">
                            <i className="icon-close"></i>
                        </button>
                        <div className='body-cnt'>

                            <h4 className="tit">Selected task</h4>
                            <div className="gray-light-bg card-no-border">
                                <h6>Instructions</h6>
                                <ul className="unorder-list">
                                    <li>Disclosure if your child has a disease treated with cortisone</li>
                                    <li>Disclosure if the child suffers from immune diseases</li>
                                    <li>Disclosure if you are allergic to some medications, vaccines and foods</li>
                                    <li>If the child has a fever or any other complaints, as disclosed, the vaccination will be postponed until the child is well..</li>
                                    <li>Disclose any chronic diseases of the child</li>
                                </ul>
                            </div>


                            <ul>
                                {data.map((item) => (
                                        Vaccination_items.indexOf(item.id) ?
                                            <div>
                                                <li key={item.id}>

                                                    <label className="dark-text" htmlFor={item.id}>{item.title}</label>
                                                    {/* <p className="dark-text">{item.title}</p> */}
                                                    <ul className="unorder-list">
                                                        <li>{item.p1}</li>
                                                        <li>{item.p2}</li>
                                                    </ul>
                                                </li>
                                            </div> : ""
                                ))}
                            </ul>

                            {/* <div>
                                <p className="dark-text">Children’s Vaccination ( Age: 2 month )</p>
                                <ul className="unorder-list">
                                    <li>Vaccination material, dgloves, alcohol wipes, masks and sterilization for the medical team</li>
                                    <li>Vaccination record will be updated and stamped</li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tasks_Modal