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
  import { INotices } from "@/types/INotices"
  
  
  export default async function Notices(){
      
      
      const data:INotices[] = await (await (await query('notices','GET')).data).query
      
      
      return(
          <div className="flex flex-col w-full justify-start items-center h-full">
            <h1 className="m-4 ">Notícias</h1>
            <Suspense fallback={<Loader2 className="mr-2 h-4 w-4 animate-spin" />}>
            {
                data?.map((item)=>
                <Card className="w-11/12 full m-4" key={item.id}>
                <CardHeader>
                    <CardTitle className="text-left">{item.title}</CardTitle>
                    <CardDescription className="text-left">{`${new Date(item.timestamp_col).toLocaleString('pt-BR')}`}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm w-full text-justify">{item.body}</p>
                </CardContent>
                </Card>
                )
            }
        </Suspense>
            </div>

    )
}