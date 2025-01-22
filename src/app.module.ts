import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './Tema/entities/tema.entity';
import { TemaModule } from './Tema/tema.module';
import { AuthModule } from './auth/entitites/auth.module';
import { UsuarioModule } from './ususario/usuario.module';
import { Usuario } from './ususario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'db_blogpessoal',
      entities: [Postagem,Tema, Usuario],
      synchronize: true,
      logging: true,
    }),
    PostagemModule, 
    TemaModule,
    AuthModule,
    UsuarioModule
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
