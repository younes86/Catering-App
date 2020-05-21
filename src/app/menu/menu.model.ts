export class Menu {

  constructor(
      public id: string,
      public title: string,
      public imageUrl: string,
      public price: number,
      public userId: string,
      public qty: number,
      public type: string,
      public oder:number=0,
      public details= []
  ) {}
}