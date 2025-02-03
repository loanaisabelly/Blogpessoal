import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Tema } from "../../Tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";


// No Entity é feito a estrutura da tabela do banco de dados

@Entity({name:"tb_postagens"}) // CREATE TABLE tb_postagens - Criando a Tabela no Banco
export class Postagem{

    // Indicando através do decorador que o ID é a chave primaria da Tabela - INT AUTO_INCREMENT PRIMARY KEY
    @ApiProperty()  
    @PrimaryGeneratedColumn()    
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim()) // Utilizado para tirar espaço em branco.
    @ApiProperty()
    @IsNotEmpty() // Validação dos dados do objeto - É DA APLICAÇÃO E NÃO DO BANCO DE DADOS
    @Column({length: 100, nullable: false}) // Indicando que será um VARCHAR(100) e NOT NULL
    titulo: string; 
    
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 1000, nullable: false}) 
    texto: string;

    @ApiProperty() 
    @UpdateDateColumn() // Automaticamente será gerado através do relogio da maquina
    data: Date;

    @ApiProperty({ type: () => Tema }) 
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: "CASCADE"})
    tema: Tema; 

    @ApiProperty({ type: () => Usuario })
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario

}