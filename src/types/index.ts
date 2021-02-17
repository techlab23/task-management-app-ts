export interface Board {
  id: string,
  name: string,
  description: string, 
  archived: boolean
  lists: List[]
}
export interface List{
  id: string,
  name: string,
  headerColor: string, 
  archived: boolean,
  items: Item[]
}
export interface Item{
  id: string,
  text: string
}