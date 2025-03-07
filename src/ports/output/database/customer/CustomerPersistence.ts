import { CreateCustomerData, Customer, DeleteCustomerData, GetCustomerData, UpdateCustomerData } from "./CustomerPersistence.types";

export interface CustomerPersistence {
    createCustomer(data: CreateCustomerData): Promise<Customer>;
    getCustomer(data: GetCustomerData): Promise<Customer>;
    listCustomers(): Promise<Customer[]>;
    updateCustomer(data: UpdateCustomerData): Promise<Customer>;
    deleteCustomer(data: DeleteCustomerData): Promise<void>;
}