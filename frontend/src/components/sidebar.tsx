import { ScrollArea } from "@/components/ui/scroll-area"
import MenuList from "./others/menuList"



export default function Sidebar(){
    return(
        <aside className="hidden md:block w-1/5 -translate-x-full transform bg-white p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
            <div className="my-4 w-full border-b-4 border-indigo-100 text-center">
                <span className="font-mono text-xl font-bold tracking-widest"> <span className="text-indigo-600">Área do</span> Condômino </span>
            </div>
            <div className="my-4">
                <ScrollArea className="h-[450px] w-auto rounded-md border p-4">
                    <MenuList />
                </ScrollArea>
            </div>
        </aside>
    )
}