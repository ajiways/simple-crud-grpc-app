import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  ADD_ONE,
  DELETE_ONE,
  FIND_ALL,
  PRODUCTS_SERVICE,
  UPDATE_ONE,
} from './constants/constants';
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

  @GrpcMethod(PRODUCTS_SERVICE, FIND_ALL)
  findAll(): FindAllProductsResponse__Output {
    return this.appService.findAll();
  }

  @GrpcMethod(PRODUCTS_SERVICE, ADD_ONE)
  addOne(data: AddOneProductRequest): AddOneProductResponse__Output {
    return this.appService.addOne(data);
  }

  @GrpcMethod(PRODUCTS_SERVICE, DELETE_ONE)
  deleteOne(data: DeleteOneRequest): DeleteOneResponse__Output {
    return this.appService.deleteOne(data);
  }

  @GrpcMethod(PRODUCTS_SERVICE, UPDATE_ONE)
  updateOne(data: UpdateOneRequest): UpdateOneResponse__Output {
    return this.appService.updateOne(data);
  }
}
