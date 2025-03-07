import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController";
import { DiTokens } from "../../../shared/DiTokens";
import diContainer from "../../../shared/diContainer";

const customerRoutes: Router = Router()

const customerController: CustomerController = diContainer.get(DiTokens.CustomerController);

customerRoutes.get("/", (req, res, next) => {
    customerController.listCustomers(req, res, next);
});
customerRoutes.get("/:id", (req, res, next) => {
    customerController.getCustomer(req, res, next);
});
customerRoutes.post("/", (req, res, next) => {
    customerController.createCustomer(req, res, next);
});
customerRoutes.put("/:id", (req, res, next) => {
    customerController.updateCustomer(req, res, next);
});
customerRoutes.delete("/:id", (req, res, next) => {
    customerController.deleteCustomer(req, res, next);
});

export default customerRoutes;
