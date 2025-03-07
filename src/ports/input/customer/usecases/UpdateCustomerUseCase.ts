import { UpdateCustomerParams, UpdateCustomerResult } from "./types";

export interface UpdateCustomerUseCase {
    execute(params: UpdateCustomerParams): Promise<UpdateCustomerResult>;
}