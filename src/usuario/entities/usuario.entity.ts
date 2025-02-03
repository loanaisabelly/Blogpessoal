import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../postagem/entities/postagem.entity"
import { Transform, TransformFnParams } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"


@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    @ApiProperty()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    @ApiProperty() 
    nome: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsEmail()
    @Column({length: 255, nullable: false })
    @ApiProperty({example: "email@email.com.br"}) 
    usuario: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @MinLength(8)
    @Column({length: 255, nullable: false }) 
    @ApiProperty() 
    senha: string

    @Column({length: 5000 }) 
    @ApiProperty() 
    foto: string

    @ApiProperty() 
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem: Postagem[]

}