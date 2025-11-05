import './Tabs.css';

import { useEffect, useRef, useState } from 'react';

const Tabs = ({ tabs, activeTab, onTabChange }) => {
    const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef([]);

    useEffect(() => {
        if (tabRefs.current[activeTab]) {
            const btn = tabRefs.current[activeTab];
            setSliderStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
        }
    }, [activeTab, tabs]);

    return (
        <div className="content-tabs">
            <div className="tab-button-box">
                <div className="tab-slider" style={{ left: sliderStyle.left, width: sliderStyle.width }} />
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        ref={(el) => (tabRefs.current[tab.key] = el)}
                        className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
