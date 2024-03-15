'use client'
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useState } from "react";
import { Suspense } from "react";
import { Loader2 } from 'lucide-react'


export default function HamburgerMenuMobile({ children }: {children:React.ReactNode}){
    const [isActive, setActive] = useState(false)

    return(
        <>
        <aside className="flex mb:hidden">
            <GiHamburgerMenu className="fixed md:hidden top-5 right-5 text-3xl	" onClick={()=>setActive(!isActive)}/>
           
            { isActive &&
            <aside className="fixed top-0 left-0 transition-transform duration-150 ease-in bg-gray-50 h-screen md:hidden">
                <Suspense fallback={<div className="w-full h-[450px] flex items-center justify-center"><Loader2 className="mr-2 h-4 w-4 animate-spin"/></div>}>
                   {children}
                </Suspense>
            </aside>
            }
        </aside>
        </>
    )
}