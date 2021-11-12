import {Table} from "./Table";

export interface Task{
  indexes:{"offset":string,"level1":string,"level2":string,"level3":string,"level4":string},
  address:string,
  PML4?:Table
  PDPT?:Table,
  PDT?:Table,
  PT?:Table,
  seed:string
}
