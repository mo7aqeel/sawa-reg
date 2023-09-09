import React from "react";

const ChooserContainer = (props) => {
    return(
        <div className="choosers">
            {props.children}
        </div>
    )
}

export default ChooserContainer;