import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, Query, Req, Res } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "../interface/product.interface";
import { ProductService } from "./product.service";
import { Response, Request } from 'express';
import { HTTP_CODE } from "../errorcodes/error";
import { ProductDTO } from "../dto/product.dto";

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

  @Get('/all')
  @ApiOperation({ summary: 'Retorna todos os produtos' })
  @ApiResponse( { status: HTTP_CODE.OK, description: 'Retorna lista de produtos salvos' })
  @HttpCode(HTTP_CODE.OK)
  @Header('Content-type', 'application/json')
  async listProducts(@Res() res: Response, @Req() req: Request): Promise<Response> {
    try {
      const savedProduct = await this.productService.findAll()
      return res.status(savedProduct.status).json(savedProduct.response)
    } catch(e) {
      console.log(e.stack)
      throw new Error('Cannot list products')
    }
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Retorna um produto pelo id' })
  @ApiResponse( { status: HTTP_CODE.OK, description: 'Retorna produto' })
  @ApiParam({ name: 'id' })
  @HttpCode(HTTP_CODE.OK)
  @Header('Content-type', 'application/json')
  async getProduct(@Res() res: Response, @Req() req: Request, @Param() params): Promise<Response> {
    try {
      const savedProduct = await this.productService.get(params.id)
      return res.status(savedProduct.status).json(savedProduct.response)
    } catch(e) {
      console.log(e.stack)
      throw new Error('Cannot get product')
    }
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Apaga um produto pelo id' })
  @ApiResponse( { status: HTTP_CODE.OK, description: 'Retorna sucesso' })
  @ApiParam({ name: 'id' })
  @HttpCode(HTTP_CODE.OK)
  @Header('Content-type', 'application/json')
  async deleteProduct(@Res() res: Response, @Req() req: Request, @Param() params): Promise<Response> {
    try {
      const savedProduct = await this.productService.delete(params.id)
      return res.status(savedProduct.status).json(savedProduct.response)
    } catch(e) {
      console.log(e.stack)
      throw new Error('Cannot get product')
    }
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Atualiza um produto' })
  @ApiResponse( { status: HTTP_CODE.OK, description: 'Retorna produto atualizado' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ProductDTO })
  @HttpCode(HTTP_CODE.OK)
  @Header('Content-type', 'application/json')
  async updateProduct(@Res() res: Response, @Req() req: Request, @Param() params, @Body() body: Product): Promise<Response> {
    try {
      const savedProduct = await this.productService.update(params.id, body)
      return res.status(savedProduct.status).json(savedProduct.response)
    } catch(e) {
      console.log(e.stack)
      throw new Error('Cannot save product')
    }
  }
}