import { Customer } from "./Customer";

export type UpdateCustomerParams = {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
}

export type UpdateCustomerResult = Promise<Customer>;

