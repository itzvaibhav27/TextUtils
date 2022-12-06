import React from 'react'

export default function Alert(props) {
  const toCapitalize = (str) =>{
      return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div style={{height: '40px'}} className='my-2'>
    {props.alert && <div className='container'>
      <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{toCapitalize(props.alert.type)}</strong>: {props.alert.msg}
      </div>
    </div>}
    </div>
  )
}
