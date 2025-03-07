import { Customer } from "../entities/Customer";
import { CreateCustomerData, DeleteCustomerData, GetCustomerData, UpdateCustomerData } from "./CustomerService.types";

export interface CustomerService {
    createCustomer(data: CreateCustomerData): Promise<Customer>;
    getCustomer(data: GetCustomerData): Promise<Customer>;
    listCustomers(): Promise<Customer[]>;
    updateCustomer(data: UpdateCustomerData): Promise<Customer>;
    deleteCustomer(data: DeleteCustomerData): Promise<void>;
}