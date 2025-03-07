import { Customer } from "./Customer";

export type CreateCustomerParams = {
    name: string;
    email: string;
    phone: string;
}

export type CreateCustomerResult = Promise<Customer>;

