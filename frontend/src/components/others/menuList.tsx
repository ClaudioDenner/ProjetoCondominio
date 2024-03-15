'use server'
import { FaLock } from "react-icons/fa6";
import { existsCookie } from "@/scripts/existsCookie";
import { getCookie } from "@/scripts/getCookie";
import { Suspense } from "react";
import { Loader2 } from 'lucide-react'
import { cookies } from 'next/headers'
import ButtonLoggout from "./buttonLoggout";
import { MdNewspaper } from "react-icons/md";
import { TbUserSquareRounded } from "react-icons/tb";
import { MdAttachMoney } from "react-icons/md";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { MdContactSupport } from "react-icons/md";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";


export default async function MenuList( ){
    
    const auth = await existsCookie('auth')
    const role = await getCookie('role')
    function loggout(){
        const response = cookies()
        return response.delete('auth')
    }
    
    
    return(
        <Suspense fallback={<Loader2 />}>
            <div className="w-full mx-auto">

            { !auth ?
            <div className="w-full h-[450px] flex justify-center items-center">
                <FaLock />
            </div>
            :

                <aside className="w-full">
                <div className="px-3 py-4 overflow-y-auto rounded dark:bg-gray-800">
                    <ul className="space-y-2">

                        <li>
                            {
                            role?.value ==='admin' ?
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            <MdNewspaper />
                                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <Link href="/">Ver todas</Link>
                                        </AccordionContent>
                                        <AccordionContent>
                                            Nova
                                        </AccordionContent>
                                        <AccordionContent>
                                            Remover
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            :
                                <Link href="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <MdNewspaper />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Noticias</span>
                                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
                                </Link>
                        
                            }
                        </li>
                        <li>
                            <a href="/pessoas"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FaUser />
                                <span className="flex-1 ml-3 whitespace-nowrap">Pessoas</span>
                            </a>
                        </li>
                        <li>
                            <a href="/financeiro"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <MdAttachMoney />
                                <span className="flex-1 ml-3 whitespace-nowrap">Financeiro</span>
                            </a>
                        </li>
                        <li>
                            <Link href="/chamados"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <MdContactSupport />
                                <span className="flex-1 ml-3 whitespace-nowrap">Chamados</span>
                            </Link>
                        </li>
                        <ButtonLoggout />
                    </ul>
                </div>
            </aside> 

    
            }
            </div>
        </Suspense>
    )
}