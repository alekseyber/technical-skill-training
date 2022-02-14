import { ConflictException, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { UsersModule } from 'src/users/users.module';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import {
  Catalog,
  CatalogDocument,
  CatalogSchema,
} from './schemas/catalog.schema';

@Module({
  imports: [
    QuizzesModule,
    UsersModule,
    MongooseModule.forFeatureAsync([
      {
        name: Catalog.name,
        useFactory: () => {
          const schema = CatalogSchema;
          schema.pre<CatalogDocument>(
            /deleteOne/,
            { document: true },
            function (next) {
              if (this.childs.length > 0) {
                next(
                  new ConflictException(
                    'В каталоге еще есть элементы, удаление не возможно.'
                  )
                );
              }
              next();
            }
          );
          return schema;
        },
      },
    ]),
  ],
  providers: [CatalogService],
  controllers: [CatalogController],
})
export class CatalogModule {}
