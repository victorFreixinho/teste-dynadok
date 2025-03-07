import { inject, injectable } from "inversify";
import { ListCustomersUseCase, ListCustomersResult } from "../../../ports/input/customer";
import { CustomerService } from "../services/CustomerService";
import { DiTokens } from "../../../shared/DiTokens";

@injectable()
export class ListCustomersUseCaseImpl implements ListCustomersUseCase {
    
    constructor(@inject(DiTokens.CustomerService) private readonly customerService: CustomerService) {}
    
    async execute(): ListCustomersResult {
        const customers = (await this.customerService.listCustomers()) ?? [];

        return customers.map(customer => ({
            id: customer.getId(),
            name: customer.getName(),
            email: customer.getEmail(),
            phone: customer.getPhone(),
        }));
    }
}