import { inject, injectable } from "inversify";
import {  GetCustomerUseCase, GetCustomerParams, GetCustomerResult } from "../../../ports/input/customer";
import { CustomerService } from "../services/CustomerService";
import { DiTokens } from "../../../shared/DiTokens";

@injectable()
export class GetCustomerUseCaseImpl implements GetCustomerUseCase {

    constructor(@inject(DiTokens.CustomerService) private readonly customerService: CustomerService) {}
    
    async execute(params: GetCustomerParams): GetCustomerResult {
        const data = params;
        const customer = await this.customerService.getCustomer(data);
        
        return {
            id: customer.getId(),
            name: customer.getName(),
            email: customer.getEmail(),
            phone: customer.getPhone(),
        }
    }
}