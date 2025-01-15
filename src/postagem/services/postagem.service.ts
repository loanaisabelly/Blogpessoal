// Utilizado para criar todos os Metodos do CRUD 

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { Repository } from "typeorm";

/**Utilizado para informar que a classe é uma classe de serviços, onde pode 
 * ser injetada dentro de outras classes. */ 

@Injectable()
export class PostagemService{

    constructor(
        @InjectRepository(Postagem) /** Para o repository criar instruções SQL no banco de dados, com base na classe model Postagem.*/ 
        private postagemRepository: Repository<Postagem> // Traz varios metodos, fazendo o papel das instruções do SQL.
    ){}

    // responsavel por trazer todas as postagens 
    async findALL(): Promise<Postagem[]>{
        return this.postagemRepository.find(); // SELECT * FROM TB_postagens;
    }
}