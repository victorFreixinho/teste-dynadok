import { inject, injectable } from "inversify";
import { CreateCustomerUseCase, CreateCustomerParams, CreateCustomerResult } from "../../../ports/input/customer";
import { CustomerService } from "../services/CustomerService";
import { DiTokens } from "../../../shared/DiTokens";

@injectable()
export class CreateCustomerUseCaseImpl implements CreateCustomerUseCase {

    constructor(@inject(DiTokens.CustomerService) private readonly customerService: CustomerService) {}

    async execute(params: CreateCustomerParams): CreateCustomerResult {
        const data = params;
        const customer = await this.customerService.createCustomer(data);
        
        return {
            id: customer.getId(),
            name: customer.getName(),
            email: customer.getEmail(),
            phone: customer.getPhone(),
        }
    }
}