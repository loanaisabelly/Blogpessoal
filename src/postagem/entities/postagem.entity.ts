import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

// No Entity é feito a estrutura da tabela do banco de dados

@Entity({name:"tb_postagens"}) // CREATE TABLE tb_postagens - Criando a Tabela no Banco
export class Postagem{

    // Indicando através do decorador que o ID é a chave primaria da Tabela - INT AUTO_INCREMENT PRIMARY KEY
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty() // Validação dos dados do objeto - É DA APLICAÇÃO E NÃO DO BANCO DE DADOS
    @Column({length: 100, nullable: false}) // Indicando que será um VARCHAR(100) e NOT NULL
    titulo: string; 

    @IsNotEmpty()
    @Column({length: 1000, nullable: false}) 
    texto: string;

    @UpdateDateColumn() // Automaticamente será gerado através do relogio da maquina
    data: Date;




}