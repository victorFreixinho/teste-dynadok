import "reflect-metadata";
import { CustomerRepositoryImpl } from "./CustomerRepositoryImpl";
import { CustomerEntity } from "./CustomerEntity";
import { Model } from "mongoose";

describe('CustomerRepository', () => {

    const MOCKED_CUSTOMER = { id: "1", name: 'Test', email: 'test@gmail.com', phone: '123456789' };
    let model: Model<CustomerEntity>;
    let customerRepository: CustomerRepositoryImpl;

    beforeEach(() => {
        model = {
            create: jest.fn().mockResolvedValue(MOCKED_CUSTOMER),
            findOne: jest.fn().mockResolvedValue(MOCKED_CUSTOMER),
            find: jest.fn().mockResolvedValue([MOCKED_CUSTOMER]),
            findOneAndUpdate: jest.fn().mockResolvedValue(MOCKED_CUSTOMER),
            deleteOne: jest.fn().mockResolvedValue(undefined),
        } as unknown as Model<CustomerEntity>;
        customerRepository = new CustomerRepositoryImpl(model);
    });

    it('should create customer with success', async () => {
        const data = {...MOCKED_CUSTOMER};
        const customer = await customerRepository.create(data);
        expect(model.create).toHaveBeenCalledTimes(1);
        expect(customer).toEqual(MOCKED_CUSTOMER);
    });

    it('should get customer with success', async () => {
        const customer = await customerRepository.findById(MOCKED_CUSTOMER.id);
        expect(model.findOne).toHaveBeenCalledTimes(1);
        expect(customer).toEqual(MOCKED_CUSTOMER);
    });

    it('should list customers with success', async () => {
        const customers = await customerRepository.findAll();
        expect(model.find).toHaveBeenCalledTimes(1);
        expect(customers).toEqual([MOCKED_CUSTOMER]);
    });

    it('should update customer with success', async () => {
        const name = 'Test Updated';
        const data = {...MOCKED_CUSTOMER, name};
        const customer = await customerRepository.update(MOCKED_CUSTOMER.id, data);
        expect(model.findOneAndUpdate).toHaveBeenCalledTimes(1);
        expect(customer).toEqual(MOCKED_CUSTOMER);
    });

    it('should delete customer with success', async () => {
        const customer = await customerRepository.delete(MOCKED_CUSTOMER.id);
        expect(model.deleteOne).toHaveBeenCalledTimes(1);
        expect(customer).toBeUndefined();
    });
});