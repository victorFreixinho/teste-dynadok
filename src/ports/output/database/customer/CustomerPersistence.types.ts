export type CreateCustomerData = {
    name: string;
    email: string;
    phone: string;
}

export type UpdateCustomerData = {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
}

export type GetCustomerData = {
    id: string;
}

export type DeleteCustomerData = {
    id: string;
}

export type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
}