import { InjectModel } from '@nestjs/mongoose';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'; //NotFoundException,
import { LeanDocument, Model } from 'mongoose';
import { BaseMongoDto } from 'src/dto/baseMongoDto';
import { Catalog, CatalogDocument } from './schemas/catalog.schema';
import { CreateCatalogDto, UpdateCatalogDto } from './dto/catalogDto';
import {
  CreateCatalogChildDto,
  UpdateCatalogChildDto,
} from './dto/catalogChildDto';
import { CatalogChildDocument } from './schemas/catalogChild.schema';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog.name)
    private catalogModel: Model<CatalogDocument>,
    private quizzesService: QuizzesService,
    private usersService: UsersService
  ) {}

  async create(createCatalogDto: CreateCatalogDto): Promise<CatalogDocument> {
    const createdCatalog = new this.catalogModel(createCatalogDto);
    return createdCatalog.save();
  }

  async update(updateUserDto: UpdateCatalogDto): Promise<CatalogDocument> {
    const { _id, ...data } = updateUserDto;

    const doc = await this.catalogModel.findOneAndUpdate({ _id }, data, {
      fields: data,
    });
    if (!doc) throw new NotFoundException('Каталог не найден');

    return doc;
  }

  async findById(_id: string): Promise<CatalogDocument> {
    const doc = await this.catalogModel.findById(_id);
    if (!doc) throw new NotFoundException('Каталог не найден');
    return doc;
  }
  async deleteById(_id: string): Promise<BaseMongoDto> {
    const doc = await this.findById(_id);
    await doc.deleteOne();
    return { _id };
  }

  async get(): Promise<CatalogDocument[]> {
    return await this.catalogModel.find().exec();
  }

  async findAllUser(): Promise<CatalogDocument[]> {
    const aggregate = await this.catalogModel.aggregate<CatalogDocument>([
      { $match: { status: true } },
      {
        $project: {
          title: 1,
          status: 1,
          childs: 1,
        },
      },
      { $unwind: '$childs' },
      {
        $project: {
          _id: '$_id',
          title: '$title',
          status: '$status',
          childsTitle: '$childs.title',
          childsId: '$childs._id',
          childsStatus: '$childs.status',
          childsChilds: '$childs.childs',
        },
      },
      { $match: { childsStatus: true } },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          status: { $first: '$status' },
          childs: {
            $addToSet: {
              _id: '$childsId',
              title: '$childsTitle',
              status: '$childsStatus',
              childs: '$childsChilds',
            },
          },
        },
      },
      { $sort: { title: 1 } },
    ]);

    return aggregate;
  }

  async findAllAdmin(): Promise<LeanDocument<CatalogDocument>[]> {
    return this.catalogModel.find().sort('title').exec();
  }

  async findAll(): Promise<LeanDocument<CatalogDocument>[]> {
    const isAdmin = this.usersService.isAdmin();
    const docs = isAdmin ? await this.findAllAdmin() : await this.findAllUser();

    const quizzes = await this.quizzesService.getQuizzes(isAdmin);

    const rezult = docs.map((doc: CatalogDocument) => {
      const item = doc.toObject ? doc.toObject() : { ...doc };

      if (item.childs.length) {
        item.childs.forEach((child, i) => {
          if (quizzes[child._id]) {
            item.childs[i].childs = quizzes[child._id];
          }
        });
      }

      return item;
    });

    return rezult;
  }

  async createChild(
    createCatalogChildDto: CreateCatalogChildDto
  ): Promise<CatalogChildDocument> {
    const { parentId, ...data } = createCatalogChildDto;

    const doc = await this.findById(parentId);
    //const rezult = doc.childs.create(data);

    doc.childs.push(data);

    await doc.save();

    const rezult = doc.childs[doc.childs.length - 1];

    return rezult;
  }
  async findOneChild(_id: string): Promise<CatalogDocument> {
    const doc = await this.catalogModel.findOne(
      {
        'childs._id': _id,
      },
      { childs: true }
    );
    if (!doc) throw new NotFoundException('Раздел не найден');
    return doc;
  }
  async updateChild(
    updateCatalogChildDto: UpdateCatalogChildDto
  ): Promise<UpdateCatalogChildDto> {
    const { _id, ...data } = updateCatalogChildDto;

    const doc = await this.findOneChild(_id);
    const childs = doc.childs.id(_id);

    Object.keys(data).forEach((key) => {
      childs[key] = data[key];
    });
    await doc.save();

    return updateCatalogChildDto;
  }
  async deleteChild(_id: string): Promise<BaseMongoDto> {
    const quizzes = await this.quizzesService.getQuizzes(true, _id);

    if (quizzes[_id])
      throw new ConflictException(
        'В разделе еще есть элементы, удаление не возможно.'
      );

    const doc = await this.findOneChild(_id);

    doc.childs.id(_id).remove();

    await doc.save();

    return { _id };
  }
}
