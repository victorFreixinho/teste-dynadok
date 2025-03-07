import { inject, injectable } from "inversify";
import { CustomerPersistence } from "../../../ports/output/database/customer";
import { Customer } from "../entities/Customer";
import { CustomerService } from "./CustomerService";
import { CreateCustomerData, DeleteCustomerData, GetCustomerData, UpdateCustomerData } from "./CustomerService.types";
import { DiTokens } from "../../../shared/DiTokens";
import { CacheManager } from "../../../ports/output/cache/CacheManager";
import { MessagingManager } from "../../../ports/output/messaging/MessagingManager";

@injectable()
export class CustomerServiceImpl implements CustomerService {

    constructor(
        @inject(DiTokens.CustomerPersistence) private readonly customerPersistence: CustomerPersistence,
        @inject(DiTokens.CacheManager) private readonly cacheManager: CacheManager,
        @inject(DiTokens.MessagingManager) private readonly messagingManager: MessagingManager
    ) {}

    async createCustomer(data: CreateCustomerData): Promise<Customer> {
        const customer = await this.customerPersistence.createCustomer(data);
        await this.messagingManager.publish('customer-created', JSON.stringify(customer));
        return new Customer(customer.id, customer.name, customer.email, customer.phone);
    }
    async getCustomer(data: GetCustomerData): Promise<Customer> {
        const cachedCustomer = await this.cacheManager.getCustomer(data.id);
        let customer = cachedCustomer;
        if (!customer) {
            customer = await this.customerPersistence.getCustomer(data);
            await this.cacheManager.saveCustomer(customer.id, customer);
        }
        return new Customer(customer.id, customer.name, customer.email, customer.phone);
    }
    async listCustomers(): Promise<Customer[]> {
        const customers = await this.customerPersistence.listCustomers();
        return customers.map(customer => new Customer(customer.id, customer.name, customer.email, customer.phone));
    }
    async updateCustomer(data: UpdateCustomerData): Promise<Customer> {
        const customer = await this.customerPersistence.updateCustomer(data);
        return new Customer(customer.id, customer.name, customer.email, customer.phone);
    }
    async deleteCustomer(data: DeleteCustomerData): Promise<void> {
        await this.customerPersistence.deleteCustomer(data);
    }
}