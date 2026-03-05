import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './controllers/CategoryController';
import { CategoryService } from './services/CategoryServices';
import { Category } from './entities/Category';
import { Transactions } from './entities/Transaction';
import { CategoryRepository } from './repos/CategoryRepo';
import { TransactionsController } from './controllers/TransactionsController';
import { TransactionsServices } from './services/TransactionsServices';
import { TransactionsRepo } from './repos/TransactionsRepo';

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
    TypeOrmModule.forFeature([Category,Transactions]),
  ],
  controllers: [AppController, CategoryController , TransactionsController],
  providers: [AppService,
    {provide : "ICategoryService" ,  useClass: CategoryService},
    {provide : "ITransactionsService" ,  useClass: TransactionsServices},
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
    { provide: 'ITransactionsRepo', useClass: TransactionsRepo }
  ],
})
export class AppModule {}