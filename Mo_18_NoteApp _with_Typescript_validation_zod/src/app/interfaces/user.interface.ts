
export interface IAddress { //subinterface for address
    city: string,
    street: string,
    zip: number
}


export interface IUser {
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    password: string,
    role: 'USER' | 'ADMIN' | 'SUPERADMIN',
    address: IAddress
}