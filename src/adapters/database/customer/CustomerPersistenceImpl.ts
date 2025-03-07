import { inject, injectable } from "inversify";
import { CreateCustomerData, Customer, CustomerPersistence, DeleteCustomerData, GetCustomerData, UpdateCustomerData } from "../../../ports/output/database/customer";
import { CustomerRepository } from "./CustomerRepository";
import { DiTokens } from "../../../shared/DiTokens";
import { v4 as uuidv4 } from 'uuid';
import { StatusError } from "../../../shared/StatusError";

@injectable()
export class CustomerPersistenceImpl implements CustomerPersistence {

    constructor(@inject(DiTokens.CustomerRepository) private readonly customerRepository: CustomerRepository) {}
    
    async createCustomer(data: CreateCustomerData): Promise<Customer> {
        const entity = await this.customerRepository.create({...data, id: uuidv4()});
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            phone: entity.phone
        }
    }
    async getCustomer(data: GetCustomerData): Promise<Customer> {
        const entity = await this.customerRepository.findById(data.id);
        if(!entity) {
            throw new StatusError(404, "Customer not found");
        }
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            phone: entity.phone
        }
    }
    async listCustomers(): Promise<Customer[]> {
        const entities = await this.customerRepository.findAll();
        return entities.map(entity => ({
            id: entity.id,
            name: entity.name,
            email: entity.email,
            phone: entity.phone
        }));
    }
    async updateCustomer(data: UpdateCustomerData): Promise<Customer> {
        const entity = await this.customerRepository.update(data.id, data);
        if(!entity) {
            throw new StatusError(404, "Customer not found");
        }
        return{
            id: entity.id,
            name: entity.name,
            email: entity.email,
            phone: entity.phone
        }
    }
    async deleteCustomer(data: DeleteCustomerData): Promise<void> {
        await this.customerRepository.delete(data.id);
    }
}