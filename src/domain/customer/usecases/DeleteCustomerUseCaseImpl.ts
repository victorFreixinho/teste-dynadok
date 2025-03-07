import { inject, injectable } from "inversify";
import { DeleteCustomerParams, DeleteCustomerResult } from "../../../ports/input/customer";
import { DeleteCustomerUseCase } from "../../../ports/input/customer/usecases/DeleteCustomerUseCase";
import { CustomerService } from "../services/CustomerService";
import { DiTokens } from "../../../shared/DiTokens";

@injectable()
export class DeleteCustomerUseCaseImpl implements DeleteCustomerUseCase {

    constructor(@inject(DiTokens.CustomerService) private readonly customerService: CustomerService) {}
    
    async execute(params: DeleteCustomerParams): DeleteCustomerResult {
        const data = params;
        await this.customerService.deleteCustomer(data);
    }
}