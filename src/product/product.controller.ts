import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";

@ApiTags('Public')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
}