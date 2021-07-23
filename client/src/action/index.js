import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const BASE_URL = "http://localhost:5000/todo";

export const addDataTODatabase = async (Data) => {
    try {
        const resp = await axios.post(BASE_URL, Data);
        // console.log(resp);
        if (resp) {
            toast.success("Data inserted in database")
        }
    } catch (error) {
        toast.error("Something went wrong");
    }
}

export const updateStatus = async (id,status) => {
    try {
        const resp = await axios.patch(BASE_URL+"/"+id, {status});
        // console.log(resp);
        if (resp) {
            return true;
        }
    } catch (error) {
        return false;
    }
}


export const getSingleTodo = async (id) => {
    try {
        const {data:{resp}} = await axios.get(BASE_URL+"/"+id);
        if (resp) {
            return resp;
        }
    } catch (error) {
        return false;
    }
}


export const deleteTodo = async (id) => {
    try {
        const resp = await axios.delete(BASE_URL+"/"+id);
        if (resp) {
            return true;
        }
    } catch (error) {
        return false;
    }
}

