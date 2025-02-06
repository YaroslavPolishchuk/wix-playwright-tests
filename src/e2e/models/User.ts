export class User{

    private _name:string;
    private _password:string;
    private _itemsInCart:Array<string>;
    private _country: string;
    public get country(): string {
        return this._country;
    }
    
    private _city: string;
    public get city(): string {
        return this._city;
    }
    
    private _creditcard: string;
    public get creditcard(): string {
        return this._creditcard;
    }
    
    private _month: string;
    public get month(): string {
        return this._month;
    }
    
    private _year: number;
    public get year(): number {
        return this._year;
    }
    
    

    constructor(name:string,password:string, country:string,city:string,creditcard:string,month:string,year:number){
        this._name=name;
        this._password=password;
        this._country=country;
        this._city=city;
        this._creditcard=creditcard;
        this._month=month;
        this._year=year;
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
        return this._name;
    }

    getPassword(): string {
        return this._password;
    }
}