import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Suspense } from "react"
  import { query } from "@/scripts/query"
  import { Loader2 } from "lucide-react"
  import { IFinances } from "@/types/IFinances"
  import { MdOutlineClear } from "react-icons/md";
  import { FaCheck } from "react-icons/fa";
  
  
  export default async function Finances(){
      
      
      const data:IFinances[] = await (await (await query('finances','GET')).data).query
      
      return(
          <div className="flex flex-col w-full justify-start items-center h-full">
            <h1 className="m-4 ">Financeiro</h1>
            <Suspense fallback={<Loader2 className="mr-2 h-4 w-4 animate-spin" />}>
            {
                data?.map((item)=>
                <Card className="w-11/12 full m-4" key={item.id}>
                <CardHeader>
                    <CardTitle className="text-left">{item.description}</CardTitle>
                    <CardDescription className="text-left">{`Referencia: ${item.reference}`}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-stretch items-">
                    <p className="text-sm w-full text-justify block">{`Status: ${item.status}`}</p>
                    {
                        item.status === "pending" ? <MdOutlineClear className="text-red-300" /> : <FaCheck className="text-green-200" />
                    }
                    </div>
                    <p className="block text-sm text-left">{`Código de Barras: 00190500954.01448160690.68093503143.${Math.floor(Math.random()*100000000000)}`}</p>
                    <p className="block text-sm text-left">{`${(item.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}</p>
                </CardContent>
                </Card>
                )
            }
        </Suspense>
            </div>

    )
}