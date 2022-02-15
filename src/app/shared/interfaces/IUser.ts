export interface IUser {
    uid:string,
    email:string,
    password?:string,
    age?:string | unknown,
    username?:string
}