import React from "react";

function CustomerDelete(props){
    
    const deleteCustomer=(id)=>{
        const url='http://localhost:5000/api/customers/'+id;
        console.log(props);
        fetch(url,{
            method:'DELETE',
        })
        props.stateRefresh();
    }

    return(
        <button onClick={(e)=>deleteCustomer(props.id)}>삭제</button>
    )
}

export default CustomerDelete;