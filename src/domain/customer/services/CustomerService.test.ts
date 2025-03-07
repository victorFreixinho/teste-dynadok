import "reflect-metadata";
import { CustomerServiceImpl } from "./CustomerServiceImpl";
import { CustomerPersistence } from "../../../ports/output/database/customer";
import { Customer } from "../entities/Customer";
import { CreateCustomerData } from "./CustomerService.types";
import { CacheManager } from "../../../ports/output/cache/CacheManager";
import { MessagingManager } from "../../../ports/output/messaging/MessagingManager";

describe('CustomerService', () => {

    const MOCKED_CUSTOMER = { id: "1", name: 'Test', email: 'test@gmail.com', phone: '123456789' };
    let customerPersistence: CustomerPersistence;
    let cacheManager: CacheManager;
    let messagingManager: MessagingManager;
    let customerService: CustomerServiceImpl;

    beforeEach(() => {
        customerPersistence = {
            createCustomer: jest.fn().mockResolvedValue(MOCKED_CUSTOMER),
            getCustomer: jest.fn().mockResolvedValue(MOCKED_CUSTOMER),
            listCustomers: jest.fn().mockResolvedValue([MOCKED_CUSTOMER]),
            updateCustomer: jest.fn().mockResolvedValue(MOCKED_CUSTOMER),
            deleteCustomer: jest.fn().mockResolvedValue(undefined),
        };
        cacheManager = {
            getCustomer: jest.fn().mockResolvedValue(undefined),
            saveCustomer: jest.fn().mockResolvedValue(undefined),
            close: jest.fn().mockReturnValue(undefined),
        };
        messagingManager = {
            connect: jest.fn().mockResolvedValue(undefined),
            publish: jest.fn().mockResolvedValue(undefined),
            consume: jest.fn().mockResolvedValue(undefined),
            close: jest.fn().mockResolvedValue(undefined),
        };
        customerService = new CustomerServiceImpl(customerPersistence, cacheManager, messagingManager);
    });

    it('should create customer with success', async () => {
        const data: CreateCustomerData = {...MOCKED_CUSTOMER};
        const customer = await customerService.createCustomer(data);
        expect(customerPersistence.createCustomer).toHaveBeenCalledTimes(1);
        expect(customer).toEqual(new Customer(MOCKED_CUSTOMER.id, MOCKED_CUSTOMER.name, MOCKED_CUSTOMER.email, MOCKED_CUSTOMER.phone));
    });

    it('should get customer with success', async () => {
        const customer = await customerService.getCustomer({ id: MOCKED_CUSTOMER.id });
        expect(customerPersistence.getCustomer).toHaveBeenCalledTimes(1);
        expect(customer).toEqual(new Customer(MOCKED_CUSTOMER.id, MOCKED_CUSTOMER.name, MOCKED_CUSTOMER.email, MOCKED_CUSTOMER.phone));
    });

    it('should list customers with success', async () => {
        const customers = await customerService.listCustomers();
        expect(customerPersistence.listCustomers).toHaveBeenCalledTimes(1);
        expect(customers).toEqual([new Customer(MOCKED_CUSTOMER.id, MOCKED_CUSTOMER.name, MOCKED_CUSTOMER.email, MOCKED_CUSTOMER.phone)]);
    });

    it('should update customer with success', async () => {
        const name = 'Test Updated';
        const data: CreateCustomerData = {...MOCKED_CUSTOMER, name};
        const customer = await customerService.updateCustomer({ id: MOCKED_CUSTOMER.id, ...data });
        expect(customerPersistence.updateCustomer).toHaveBeenCalledTimes(1);
        expect(customer).toEqual(new Customer(MOCKED_CUSTOMER.id, MOCKED_CUSTOMER.name, MOCKED_CUSTOMER.email, MOCKED_CUSTOMER.phone));
    });

    it('should delete customer with success', async () => {
        const customer = await customerService.deleteCustomer({ id: MOCKED_CUSTOMER.id });
        expect(customerPersistence.deleteCustomer).toHaveBeenCalledTimes(1);
        expect(customer).toBeUndefined();
    });
});