// @ts-nocheck
import { CommentTimeCheck } from "../../../types";

function displayedAt (createdAt : CommentTimeCheck) {
        console.log(createdAt)
        const milliSeconds =  new Date() - parseInt(createdAt)
        console.log("1milliSeconds",typeof milliSeconds)
        const seconds = milliSeconds / 1000
        if (seconds < 60) return `방금 전`
        console.log("2seconds",typeof milliSeconds)
        const minutes = seconds / 60
        if (minutes < 60) return `${Math.floor(minutes)}분 전`
        console.log("3minutes",typeof milliSeconds)
        const hours = minutes / 60
        if (hours < 24) return `${Math.floor(hours)}시간 전`
        console.log("4hours",typeof milliSeconds)
        const days = hours / 24
        if (days < 7) return `${Math.floor(days)}일 전`
        console.log("5days",typeof milliSeconds)
        const weeks = days / 7
        if (weeks < 5) return `${Math.floor(weeks)}주 전`
        console.log("6weeks",typeof milliSeconds)
        const months = days / 30
        if (months < 12) return `${Math.floor(months)})개월 전`
        console.log("7months",typeof months)
        const years = days / 365
        return `${Math.floor(years)}년 전`
        }

export default displayedAt;
