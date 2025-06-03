import React, { useState, useEffect } from 'react';

function HomeFrequentlyQue() {
    const [faqData, setFaqsData] = useState([]);
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        fetch('https://zuwara.net/admin/public/api/faqs')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setFaqsData(data);
            });
    }, []);

    const toggleItem = (id) => {
        setActiveItem(prevActiveItem => (prevActiveItem === id ? null : id));
    };

    return (
        <section className="faq-box zw_faq ">
            <div className="container">
                <div className="faq-box-inner padd-x">
                    <h2 className="text-center margin-hed-one zw_title_color zw_46 poppins-semibold">Frequently Asked Questions</h2>
                    <p className="text-center poppins-semibold zw_14 mx-auto col-9 col-md-6 my-5">
                        Lorem ipsum dolor sit amet consectetur. Diam faucibus ac porttitor tincidunt
                        egestas sapien fermentum feugiat. Tortor aliquam
                    </p>
                    <div className="accordion" id="myAccordion">
                        {faqData.map((item) => (
                            <div className="accordion-item" key={item.id}>
                                <h2 className="accordion-header" id={`header${item.id}`}>
                                    <button
                                        type="button"
                                        className={`accordion-button ${activeItem === item.id ? '' : 'collapsed'} poppins-regular zw_secondary pe-5 zw_18`}
                                        onClick={() => toggleItem(item.id)}
                                        style={{ fontSize: '16px', textAlign: 'left', position: 'relative' }}
                                    >
                                        {item.Question}
                                        <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}>
                                            {activeItem === item.id ? '-' : '+'}
                                        </span>
                                    </button>
                                </h2>
                                <div
                                    id={`accordion_${item.id}`}
                                    className={`accordion-collapse collapse ${activeItem === item.id ? 'show' : ''} poppins-regular zw_secondary zw_14`}
                                    data-bs-parent="#myAccordion"
                                >
                                    <div className="accordion-body">
                                        <p className="px-4 poppins-regular zw_secondary">{item.Answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeFrequentlyQue;
