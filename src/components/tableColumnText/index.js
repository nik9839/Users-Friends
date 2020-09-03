import React from 'react';

const tableColumnText = React.memo(props=>{
    return <div style={{ textAlign: "center" }}>{props.value}</div>
})

export default tableColumnText