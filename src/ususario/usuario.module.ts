import { forwardRef, Module } from "@nestjs/common";
import { Usuario } from "./entities/usuario.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioService } from "./services/usuario.service";
import { UsuarioController } from "./controllers/usuario.controller";
import { AuthModule } from "../auth/entitites/auth.module";


@Module({

imports: [
 
    TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],
controllers: [UsuarioController],
providers: [UsuarioService],
exports: [UsuarioService],

})
export class UsuarioModule{};





