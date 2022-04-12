import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AddOneProductRequest } from './contracts/products/AddOneProductRequest';
import { AddOneProductResponse__Output } from './contracts/products/AddOneProductResponse';
import { DeleteOneRequest } from './contracts/products/DeleteOneRequest';
import { DeleteOneResponse__Output } from './contracts/products/DeleteOneResponse';
import { FindAllProductsResponse__Output } from './contracts/products/FindAllProductsResponse';
import { UpdateOneRequest } from './contracts/products/UpdateOneRequest';
import { UpdateOneResponse__Output } from './contracts/products/UpdateOneResponse';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('ProductsService', 'FindAll')
  findAll(): FindAllProductsResponse__Output {
    return this.appService.findAll();
  }

  @GrpcMethod('ProductsService', 'AddOne')
  addOne(data: AddOneProductRequest): AddOneProductResponse__Output {
    return this.appService.addOne(data);
  }

  @GrpcMethod('ProductsService', 'DeleteOne')
  deleteOne(data: DeleteOneRequest): DeleteOneResponse__Output {
    return this.appService.deleteOne(data);
  }

  @GrpcMethod('ProductsService', 'UpdateOne')
  updateOne(data: UpdateOneRequest): UpdateOneResponse__Output {
    return this.appService.updateOne(data);
  }
}
