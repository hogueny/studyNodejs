export class ErrorModel{
    private msg : string;
    private code : string;
    private category : string;
    private status : number;

    constructor(status : number , code : string, category : string , msg: string){
        this.status = status;
        this.code = code;
        this.category = category;
        this.msg = msg; 
    }

    public get $msg(): string{
        return this.msg;
    }
    
    public get $code(): string{
        return this.code;
    }
    public get $category(): string{
        return this.category;
    }
    public get $status(): number{
        return this.status;
    }

    public set $msg(value : string){
        this.msg;
    }
    
    public set $code(value : string){
        this.code;
    }
    public set $category(value : string){
        this.category;
    }
    public set $status(value : number){
        this.status;
    }

}