import axios from 'axios'
import instance, { api } from "../instance/instance";

export const commentList = async (pageNum:number) => {
    const { data } = await instance.get(`comments?_limit=10&_page=${pageNum}`)
    return data;
}

export const addComment = async (body: string | number) => {
    console.log(body);
    const { data } = await api.post("comments", body);
    return data.data;
}