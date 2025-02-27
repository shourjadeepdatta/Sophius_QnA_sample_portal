import React, { useEffect, useState } from "react";


function Message(props)
{
    useEffect(()=>{
        console.log(props);
    },[])
    return(
        <div>
            <div className="message_container">
                {props.status === "success" && <div className="success_api_message">
                    <p className="msg_text">{props.status}, {props.message}</p>
                </div>
                }:{props.status === "fail" && <div className="error_api_message">
                    <p className="msg_text">{props.status}, {props.message}</p>
                </div>
                }
                
            </div>
        </div>
    );
}

export default Message;