import react from 'react';
import { useState } from 'react';
import Message from './Message';
import Questions from './Questions';

function Input()
{
    let [qnaList,setQnaList] = useState([]);
    let [loading,setLoading] = useState(false);
    let [responseMessage,setResponseMessage] = useState("");
    let [responseStatus,setResponseStatus] = useState("");
    let [showMessage,setShowMessage] = useState(false);
    let [showList,setShowList] = useState(false);
    let [requestPacket,setRequestPacket] = useState({
        no_of_questions:"",
        input_paragraph:""
    }
    );

    function callGenerativeApi(){
        const url = "http://localhost:3001/generate_questions";
        const payload = {...requestPacket};
        const options = {
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body: JSON.stringify(payload)
        }
        setLoading(true);
        fetch(url,options)
        .then((resp)=>{
            return resp.json();
        })
        .then((data)=>{
            setShowMessage(true);
            setResponseMessage(data?.message);
            setResponseStatus(data?.status);
            if(data?.ques_list){
                setShowList(true);
            }
            console.log("response of the generative api is ->",data);
            setQnaList(data?.ques_list);
            console.log(responseMessage);
            console.log(responseStatus);
            setLoading(false);
            setTimeout(()=>{
               setShowMessage(false); 
            },5000)
        })
        .catch((err)=>{
            console.log("Some problem while calling the api->",err);
            setLoading(false);
        })
    }
    return (
        <>
            <div className='qna_section'>
                {/* <h2>Hello world</h2> */}
                <div className="inp_para_container">
                    <div className='para_header_container'>
                        <p>Please enter your paragraph</p>
                    </div>
                    <div className='inp_para_content'>
                        <textarea onChange={(e)=>{
                            setRequestPacket((prevState)=>({
                                ...prevState,
                                input_paragraph:e.target.value
                            }))
                        }} className='inp_para'></textarea>
                    </div>

                </div>
                <div className='number_of_ques_container'>
                    <div className='ques_header_container'>
                        <p className='ques_header'>Number the questions</p>
                    </div>
                    <div className='number_ques_content'>
                        <input type='text' onChange={(e)=>{
                            // console.log(e.target.value)
                            setRequestPacket((prevState)=>({
                                ...prevState,
                                no_of_questions:e.target.value
                            }))
                        }} className='number_content'/>
                    </div>
                </div>
                <div className='generative_btn_container'>
                {loading && (
                    <div className='loader_container'>
                        <div className="loader"></div>
                    </div>
                )}
                    <button onClick={callGenerativeApi} type="button" className='generative_btn'>Generate Questions</button>
                </div>
            </div>
            {showMessage && <Message message={responseMessage} status={responseStatus}/> }
            {showList && <Questions questionsList={qnaList}/>}
        </>
    )
}

export default Input