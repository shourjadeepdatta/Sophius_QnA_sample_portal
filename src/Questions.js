import React, { useEffect } from "react";


function Questions(props)
{
    let questionsList = [];
    useEffect(()=>{
        questionsList = props.questionsList;
        console.log("question list is->",props?.questionsList);
    },[])

    return (
        <div>
            <section className="questions_section">
                {props.questionsList.map((element,index)=>{
                    return (
                        <div className="card_container" id={index+1}>
                        <h3>{element}</h3>
                        </div>
                    )
                })}
                
            </section>
        </div>
    );
}

export default Questions;