'use client'
import { loggout } from "@/scripts/loggout"
import { useRouter } from "next/navigation"

export default function ButtonLoggout(){

    const router = useRouter()

    async function signOut(){
        await loggout()
        router.refresh()

    }

    return(
    
    <li onClick={()=>signOut()} className="cursor-pointer">
        <span 
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

            <span className="flex-1 ml-3 whitespace-nowrap">Sair</span>
        </span>
    </li>
    )
}