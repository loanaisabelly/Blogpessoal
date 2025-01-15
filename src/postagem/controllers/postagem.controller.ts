import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";


@Controller("/postagens")
export class PostagemController{

   constructor(
     private readonly postagemService: PostagemService
    ){}

    // Consultar todas as postagens 
   @Get()
   @HttpCode(HttpStatus.OK)
   findall(): Promise<Postagem[]>{
    return this.postagemService.findALL();
  }

  // Consultar por ID
  @Get('/:id')
   @HttpCode(HttpStatus.OK)
   findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem>{
    return this.postagemService.findById(id);
  }

  // Consultar através de uma palavra
  @Get('/titulo/:titulo')
   @HttpCode(HttpStatus.OK)
   findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]>{
    return this.postagemService.findByTitulo(titulo);
  }

  // Insere os registros no banco, através do JSON
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() postagem: Postagem): Promise<Postagem>{
    return this.postagemService.create(postagem)
  }

  // Atualiza os registros no banco, através do JSON
  @Put()
  @HttpCode(HttpStatus.CREATED)
  update(@Body() postagem: Postagem): Promise<Postagem>{
    return this.postagemService.update(postagem)
  }

  // Deleta o registro do banco de dados
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
   return this.postagemService.delete(id);
 }


}



