import React, { useEffect, useRef, useState } from "react";

export default function Slider(props) {
    const clicked = props.clicked;
    console.log(clicked)

    const [value, setValue] = useState(0);

    const dataList = [{ label: 'Free', value: 0 },
    { label: '$', value: 20 },
    { label: '$$', value: 40 },
    { label: '$$$', value: 60 },
    { label: '$$$$', value: 80 },
    { label: '$$$$$', value: 100 }];

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const getLabelForValue = (value) => {
        const item = dataList.find(item => item.value === Number(value));
        return item ? item.label : '';
    };

    const sliderRef = useRef(null);
    const [sliderWidth, setSliderWidth] = useState(0);

    useEffect(() => {
        const slider = sliderRef.current;
        
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width } = entry.contentRect;
                setSliderWidth(width);
            }
        });

        if (slider) {
            resizeObserver.observe(slider);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const elementRef2 = useRef(null);

    const val = false
    const getWidth = () => {
        if(clicked) {
            const width = elementRef2.current.clientWidth;
            return width
        }
    };

    function getIconPos() {
        return ((((getWidth() - sliderWidth) / 2) - 15) + ((sliderWidth - 25) * (value / 100)));
    }

    return (<div className="slidecontainer">
        <div className="testtest" ref={elementRef2}>
        <input type="range" min={dataList[0].value} 
                                 max={dataList[dataList.length - 1].value} 
                                 value={value} step={20} onChange={handleChange} 
                                 ref={sliderRef} list="rangeValues" 
                                 className="slider" 
                                 id="myRange" />
        <dataList id="rangeValues">
            {dataList.map((item, index) => (
                <option key={index} value={item.value} label={item.label} />
            ))}
        </dataList>
        {/* <div className="slideCon" style={{marginLeft: getIconPos()}}>
            <p style={{left: value > 80 ? '-0.9em' : '-0.5em'}}>{getLabelForValue(value)}</p>
        </div> */}
        <p className="slideCon2" style={{marginLeft: getIconPos()}}>{getLabelForValue(value)}</p>
        </div>
    </div>
    )
}