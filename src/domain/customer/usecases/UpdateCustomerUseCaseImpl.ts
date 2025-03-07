import { inject, injectable } from "inversify";
import { UpdateCustomerUseCase, UpdateCustomerParams, UpdateCustomerResult } from "../../../ports/input/customer";
import { CustomerService } from "../services/CustomerService";
import { DiTokens } from "../../../shared/DiTokens";

@injectable()
export class UpdateCustomerUseCaseImpl implements UpdateCustomerUseCase {

    constructor(@inject(DiTokens.CustomerService) private readonly customerService: CustomerService) {}
    
    async execute(params: UpdateCustomerParams): Promise<UpdateCustomerResult> {
        const data = params;
        const customer = await this.customerService.updateCustomer(data);
        
        return {
            id: customer.getId(),
            name: customer.getName(),
            email: customer.getEmail(),
            phone: customer.getPhone(),
        }
    }
}