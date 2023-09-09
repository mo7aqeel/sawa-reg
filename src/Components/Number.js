import React from "react";

const Number = (props) => {
    const {num, myClick} = props
    return(
        <div class="card">
            <div class="card-border-top">
            </div>
            <span> رقم الاستمارة</span>
            <h1 class="job">{num}</h1>
            <button onClick={myClick}>موافق</button>
        </div>
    )
}

export default Number;