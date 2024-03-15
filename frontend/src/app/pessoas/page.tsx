import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { query } from "@/scripts/query";
import { ListPeoples } from "@/components/listPeoples";
import FormPeoples from "@/components/formPeoples";


async function getData(){
  // Fetch data from your API here.
  const data = await (await (await query('peoples','GET')).data).query
  return data
}

export default async function Pessoas() {

  const response = await getData()
  const data = response === undefined ? [] : response
  
  return (
        <div className="w-full flex h-full items-start justify-center bg-white text-center text-5xl font-bold shadow-md">
          <Tabs defaultValue="list" className="w-5/6">
            <TabsList>
              <TabsTrigger value="list">Lista de Pessoas</TabsTrigger>
              <TabsTrigger value="new">Cadastrar pessoa</TabsTrigger>
            </TabsList>
            <TabsContent value="list"><ListPeoples data={data}/></TabsContent>
            <TabsContent value="new"><FormPeoples /></TabsContent>
          </Tabs>
          
        </div>
      
  );
}
