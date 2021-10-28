import { Body, Controller, Header, HttpCode, Post, Req, Res } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "src/interface/product.interface";
import { ProductService } from "./product.service";
import { Response, Request } from 'express';
import { HTTP_CODE } from "src/errorcodes/error";
import { ProductDTO } from "src/dto/product.dto";

@ApiTags('Public')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/save')
  @ApiOperation({ summary: 'Salva um produto' })
  @ApiResponse( { status: HTTP_CODE.OK, description: 'Retorna produto salvo' })
  @ApiBody({ type: ProductDTO })
  @HttpCode(HTTP_CODE.OK)
  @Header('Content-type', 'application/json')
  async saveProduct(@Res() res: Response, @Req() req: Request, @Body() body: Product): Promise<Response> {
    try {
      const savedProduct = await this.productService.save(body)
      return res.status(savedProduct.status).json(savedProduct.response)
    } catch(e) {
      console.log(e.stack)
      throw new Error('Cannot save product')
    }
  }
}