'use server'
import { cookies } from 'next/headers'


export async function existsCookie(name:string){
    const response = cookies().has(name)

    return response
    
}

