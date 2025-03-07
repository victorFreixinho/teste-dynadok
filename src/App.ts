import express, { Request, Response, NextFunction } from "express";
import * as http from "http";
import customerRoutes from "./adapters/http/routes/customerRoutes";
import diContainer from "./shared/diContainer";
import { DiTokens } from "./shared/DiTokens";
import { MessagingManager } from "./ports/output/messaging/MessagingManager";

export class App {

  private readonly server: express.Application;

  constructor() {
    this.server = express();
    this.setMiddlewares();
    this.setRouters();
  }

  public listen(port: number): http.Server {
    return this.server.listen(port, async () => {
      console.log(`Server is running on port ${port}.`);
      try {
          const messagingManager: MessagingManager = diContainer.get(DiTokens.MessagingManager);
          await messagingManager.connect();
      
          await messagingManager.consume("customer-created", (message) => {
            console.log("Received message:", message);
          });
      } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
        process.exit(1);
      }
    });
  }

  private setMiddlewares() {
    this.server.use(express.json());
  }

  private setRouters() {
    this.server.use("/customers", customerRoutes);

    // Middleware para rotas não encontradas
    this.server.use((req, res, next) => {
      res.status(404).json({
        error: "Rota não encontrada",
        path: req.originalUrl,
      });
    });

    // Middleware para tratamento de erros
    this.server.use((err: any, req: Request, res: Response, next: NextFunction)  => {
      console.error(err);
      res.status(err.status || 500).json({
        error: err.message || "Erro interno do servidor",
      });
    });
  }
}