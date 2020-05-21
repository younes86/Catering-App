import { Menu } from './menu.model';

export class orderMenu {

constructor(
  public id: string="",
  public items: Menu []=[],
  public idtable: number=0,
  public creationDate: Date=new Date()
  ) 
  {}
}