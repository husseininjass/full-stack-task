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
import { BudgetRepo } from './repos/BudgetRepo';
import { BudgetServices } from './services/BudgetServices';
import { Budget } from './entities/Budget';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BudgetListener } from './listeners/BudgetListener';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',           
      port: 5432,
      username: 'postgres',       
      password: 'password',       
      database: 'qashio_points',  
      entities: [Category,Transactions,Budget],
      synchronize: true,          
      logging: true,       
    }),
    EventEmitterModule.forRoot(),       
    TypeOrmModule.forFeature([Category,Transactions,Budget]),
  ],
  controllers: [AppController, CategoryController , TransactionsController],
  providers: [AppService,BudgetListener,
    {provide : "ICategoryService" ,  useClass: CategoryService},
    {provide : "ITransactionsService" ,  useClass: TransactionsServices},
    {provide : "IBudgetService" ,  useClass: BudgetServices},
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
    { provide: 'IBudgetRepo', useClass: BudgetRepo },
    { provide: 'ITransactionsRepo', useClass: TransactionsRepo }
  ],
})
export class AppModule {}