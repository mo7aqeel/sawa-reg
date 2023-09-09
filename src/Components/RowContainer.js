import React from "react";

const RowContainer = (props) => {
    return(
        <div style={{width: '100%', display: 'inline-flex'}}>
            {props.children}
        </div>
    )
}

export default RowContainer;