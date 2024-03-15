'use server'
import { cookies } from 'next/headers'


export async function getCookie(name:string){
    const response = cookies().get(name)

    return response
}

