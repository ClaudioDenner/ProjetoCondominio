'use server'
import { cookies } from 'next/headers'

export async function loggout(){
    const response = cookies().delete('auth')
}
