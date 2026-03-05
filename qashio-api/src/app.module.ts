import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './controllers/CategoryController';
import { CategoryService } from './services/CategoryServices';
import { Category } from './entities/Category';
import { Transactions } from './entities/Transaction';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',           
      port: 5432,
      username: 'postgres',       
      password: 'password',       
      database: 'qashio_points',  
      entities: [Category,Transactions],
      synchronize: true,          
      logging: true,              
    }),
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [AppController, CategoryController],
  providers: [AppService, CategoryService],
})
export class AppModule {}