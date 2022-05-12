import axios from "axios";
import {message} from'antd'

export const getAllJobs = () => async dispatch=>{

    dispatch({type:'LOADING', payload : true})
    try {
        const jobs = await axios.get('/api/jobs/getalljobs')
        dispatch({type:'GET_ALL_JOBS', payload : jobs.data})
        dispatch({type:'LOADING', payload : false})
    }catch (error) {
        console.log(error)
        dispatch({type:'LOADING', payload : false})
    }
}

export const postJob = (values) => async (dispatch) => {
    values.postedBy = JSON.parse(localStorage.getItem("user"))._id;
  
    dispatch({ type: "LOADING", payload: true });
    try {
      const response = await axios.post("/api/jobs/postjob", values);
  
      dispatch({ type: "LOADING", payload: false });
      message.success("Job Posted Successfully");
  
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.log(error.response);
      message.error("Something went wrong, Please try later!")
      dispatch({ type: "LOADING", payload: false });
    }
};

export const editJob = (values) => async dispatch =>{
    dispatch({type:'LOADING', payload: true});

    try{
        const job = await axios.post('/api/jobs/editjob', values)
        dispatch({type:'LOADING', payload: false});
        message.success("Job Updated Successfully")
        setTimeout(() => {
            window.location.href='/'
        }, 1000)
    }catch(error){
        
        message.error("Something went wrong, Please try later!")
        console.log(error.response);
        dispatch({type:'LOADING', payload: false});
    }
}