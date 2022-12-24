import React from "react";

function Customer(props){
    return(
        <div>
            <CustomerProfile id={props.key} image={props.image} name={props.name}/>
            <CustomerInfo birthday={props.birthday}
                gender={props.gender} job={props.job}/>
        </div>
    )
}

function CustomerProfile(props){
    return(
        <div>
            <img alt="사진" src={props.image}/>
            <h2>{props.name}({props.key})</h2>
        </div>
    )
}

function CustomerInfo(props){
    return(
        <div>
            <p>{props.birthday}</p>
            <p>{props.gender}</p>
            <p>{props.job}</p>
        </div>
    )
}

export default Customer;