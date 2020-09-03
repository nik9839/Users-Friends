import React from 'react';
import { Image } from 'react-bootstrap'

const picture = React.memo(props=>{
    return <Image src={props.url} roundedCircle style={{ height: 40, width: 40 }}/>
})

export default picture