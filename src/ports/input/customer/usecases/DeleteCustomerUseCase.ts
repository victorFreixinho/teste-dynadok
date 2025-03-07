import { DeleteCustomerParams, DeleteCustomerResult } from "./types";

export interface DeleteCustomerUseCase {
    execute(params: DeleteCustomerParams): DeleteCustomerResult;
}