import React from "react";

const Chooser = props => {
    const {title, selectorClick, active} = props;
    return(
        <button className={`choose ${active && 'active'}`} onClick={selectorClick}>{title}</button>
    )
}

export default Chooser;