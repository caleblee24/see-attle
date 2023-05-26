import React from "react";

export default function CreateFilterBoxes(props) {
    const filterBoxes = props.filterBoxes
    console.log(filterBoxes);

    const filterBoxElements = filterBoxes.map(filter => {
        return  <div className="control-flex">
                    <label className="control control-checkbox">{filter}
                        <input type="checkbox"/>
                        <div className="control_indicator"></div>
                    </label>
                </div>
    })

    return (
        <div className="control-group filterBoxesContainer">
            {filterBoxElements}
        </div>
    )
    
}