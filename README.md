### Informações gerais do projeto:

- Arquitetura escolhida: Arquitetura Hexagonal (ports and adapters);
- Implementado todos os requisitos técnicos, inclusive o bônus;
- O côdigo ainda tem melhorias e ajustes para serem feitos (melhorar o docker-compose e os testes, estilização com prettier/eslint/husky, documentação da api com swagger, etc). Porém, foi o que consegui fazer em menos de 10h, respeitando o limite do prazo passado para mim.


### Como subir a aplicação e serviços via Docker?

Basta rodar ```docker-compose up --build```. Com isso ele irá iniciar localmente toda a infraestrutura, juntamente com a aplicação node, em modo dev.

### Endpoints disponíveis e como chamá-los

Os endpoints são basicamente o CRUD de Custumer:

- Cadastrar cliente: /custumers  **[POST]**

Exemplo de body:

```
{
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "phone": "1234567890"
}
```

- Listar clientes: /custumers  **[GET]**

- Consultar cliente: /custumers/:id  **[GET]**

- Atualizar cliente: /custumers/:id  **[PUT]**

Exemplo de body:

```
{
    "id": "123",
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "phone": "1234567890"
}
```

- Deletar cliente: /custumers/:id  **[DELETE]**

###  Como rodar os testes?

```npm run test```