import { Customer } from "./Customer";

export type GetCustomerParams = {
    id: string;
}

export type GetCustomerResult = Promise<Customer>;