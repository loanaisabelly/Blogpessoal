// Utilizado para criar todos os Metodos do CRUD 

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemaService } from "../../Tema/services/tema.service";

/**Utilizado para informar que a classe é uma classe de serviços, onde pode 
 * ser injetada dentro de outras classes. */ 

@Injectable()
export class PostagemService{

    constructor(
        @InjectRepository(Postagem) /** Para o repository criar instruções SQL no banco de dados, com base na classe model Postagem.*/ 
        private postagemRepository: Repository<Postagem>, 
        private temaService: TemaService // Traz varios metodos, fazendo o papel das instruções do SQL.
    ){}

    // responsavel por trazer todas as postagens 
    async findALL(): Promise<Postagem[]>{
        return this.postagemRepository.find({
             relations: {
                tema: true
            }
        }); // SELECT * FROM TB_postagens;
    }

    async findById(id: number): Promise<Postagem> {
        // Dispara um SELECT * FROM tb_postagens WHERE id = ?;
        const postagem = await this.postagemRepository.findOne({
             where: {
                id
            }, 
              relations: {
                tema: true
            }
        })
        // Verifica se a postagem existe e dessa maneira, irá mostrar a mensagem 
        if(!postagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)
        return postagem; // Caso exista, irá retornar a postagem
    }


    async findByTitulo(titulo: string): Promise<Postagem[]>{
        return this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            },
            relations: {
                tema: true
            }    
        });  
    }

    async create(postagem: Postagem): Promise<Postagem>{

        await this.temaService.findById(postagem.tema.id)

        //INSERT INTO tb_postagens (titulo, texto) VALEUS(?,?)
        return await this.postagemRepository.save(postagem);
    }


    async update(postagem: Postagem): Promise<Postagem>{
        await this.findById(postagem.id) // UPDATE tb_postagens SET titulo = postagem.titulo, 
        // texto = postagem.texto, 
        // data =CURRENT_TIMESTAMP()  Where id = postagem.id

        await this.temaService.findById(postagem.tema.id)
        return await this.postagemRepository.save(postagem);
    }


    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
        // DELETE tb_postagens WHERE id = ? 
        return await this.postagemRepository.delete(id)
    }




}