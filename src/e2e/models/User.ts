export class User{

    name:string;
    password:string;
    _itemsInCart:Array<string>;

    constructor(name:string,password:string){
        this.name=name;
        this.password=password;
        this._itemsInCart=[];
    }    

    addToCart(item:string):void{
        this._itemsInCart.push(item);
    }

    removeFromCart(item:string):void{
        const index=this._itemsInCart.findIndex(i=>i==item);
        if(index!==-1){
            this._itemsInCart.splice(index,1);
        }
    }

    getItemsInCart():Array<string>{
        return this._itemsInCart;
    }

    getName(): string {
        return this.name;
    }

    getPassword(): string {
        return this.password;
    }
}