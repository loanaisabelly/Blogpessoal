import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { DeleteResult, ILike, Repository, ReturnDocument } from "typeorm";


@Injectable()
export class TemaService{

    constructor(
    @InjectRepository(Tema)
    private temaRepository: Repository<Tema>
    ){}

    async findAll(): Promise<Tema[]>{
        return await this.temaRepository.find()
    }

    async findById(id: number): Promise<Tema>{
    const Tema = await this.temaRepository.findOne({
         where: {
            id
        }
    })
     if(!Tema)
                throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)
            return Tema; 
        }


    async findByDescricao(descricao: string): Promise<Tema[]>{
        return await this.temaRepository.find({
            where:{
            descricao: ILike(`%${descricao}%`)
        }
        })
    }

    async create(tema: Tema): Promise<Tema>{
        return await this.temaRepository.save(tema);
        }

        
    async update(tema: Tema): Promise<Tema>{
           await this.findById(tema.id)  
           return await this.temaRepository.save(tema);
       }
   
   
       async delete(id: number): Promise<DeleteResult>{
           await this.findById(id)
           return await this.temaRepository.delete(id)
       }     












}


