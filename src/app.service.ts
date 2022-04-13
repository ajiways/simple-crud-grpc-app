import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { AddOneProductRequest } from './contracts/products/AddOneProductRequest';
import { AddOneProductResponse__Output } from './contracts/products/AddOneProductResponse';
import { DeleteOneRequest } from './contracts/products/DeleteOneRequest';
import { DeleteOneResponse__Output } from './contracts/products/DeleteOneResponse';
import { FindAllProductsResponse__Output } from './contracts/products/FindAllProductsResponse';
import { Product__Output } from './contracts/products/Product';
import { UpdateOneRequest } from './contracts/products/UpdateOneRequest';
import { UpdateOneResponse__Output } from './contracts/products/UpdateOneResponse';

@Injectable()
export class AppService {
  private mockDBxd: Product__Output[] = [
    {
      description: 'test',
      id: 'test',
      name: 'test',
      price: 123,
    },
  ];

  findAll(): FindAllProductsResponse__Output {
    return { products: this.mockDBxd };
  }

  addOne({
    description,
    name,
    price,
  }: AddOneProductRequest): AddOneProductResponse__Output {
    const product: Product__Output = {
      id: v4(),
      description,
      name,
      price,
    };

    this.mockDBxd.push(product);

    return { response: product };
  }

  deleteOne(data: DeleteOneRequest): DeleteOneResponse__Output {
    const deleted = this.findOne(data.id);

    this.mockDBxd = this.mockDBxd.filter(
      (product) => product.id !== deleted.id,
    );

    return { deleted };
  }

  updateOne({ body, id }: UpdateOneRequest): UpdateOneResponse__Output {
    const toUpdate = this.findOne(id);

    if (body.newdesription) toUpdate.description = body.newdesription;
    if (body.newname) toUpdate.name = body.newname;
    if (body.newprice) toUpdate.price = body.newprice;

    return { updated: toUpdate };
  }

  private findOne(id: string): Product__Output {
    // А как в grpc предусмотреть ошибку, т.е. если ничего не найдется?

    return this.mockDBxd.find((product) => product.id === id);
  }
}
