import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios'
import instance, { api } from "../instance/instance";

export const readComments = async ( pageNum:number ) => {
    const { data } = await instance.get(`comments?_limit=10&_page=${pageNum}`)  
    return data; // 코멘트를 페이지 당 10개씩 불러오게 지정
}

export const addComment = async ( body: string | number ) => {
    const { data } = await api.post("comments", body);
    return data.data;
}

export const removeComment = async ( id:number ) => {
    const { data } = await api.delete(`comments/${id}`);
    return data;
}

export const editComment = async ( id: number , body: string | number ) => {
    const { data } = await api.patch(`comments/${id}`, body);
    return data;
}


