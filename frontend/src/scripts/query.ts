'use server'
import { cookies } from 'next/headers'

export async function query(route:string, method:string, body?:string | FormData, contentType?:string){
    
    const cookieAuth = cookies().get('auth') 
    
    const query = await fetch(process.env.NEXT_PUBLIC_PATH_BACKEND+route,{
        method:method,
        headers:{
            "Content-Type":contentType !== undefined ? `${contentType}` : "application/json; charset=utf-8",
            "Authorization":`Bearer ${cookieAuth?.value}`
        },
        body
    })
    .then((res)=> {
        return {statusCode:res.status, data: res.json()}
    })
    .catch((err)=>{ return {statusCode:500, data:"Erro inesperado, tente novamente mais tarde.", error: err}})
    console.log(query)
    return query

}