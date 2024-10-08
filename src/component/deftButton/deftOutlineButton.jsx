import React from 'react'
import { Button } from 'react-bootstrap';

export default function DeftOutlineButton(props) {
    const { btnName, btnClass,onClick,style ,height,color} = props;
    return (
      <>
        <Button     style={{
            ...style,
            // minWidth: '120px',
            height: height ? height : 40,
            color: color ? color : 'white'
          }}  onClick={onClick}
          className={`d-flex align-items-center justify-content-center bg-transparent border ${btnClass}`}
        >
          {btnName}
          
        </Button></>)
}
