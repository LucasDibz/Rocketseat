import { getRepository, Repository } from 'typeorm';

import { Specification } from '../../entities/Specification';
import {
  ISpecificationsRepository,
  ISpecificationDTO,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async list(): Promise<Specification[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async create({
    name,
    description,
  }: ISpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}

export { SpecificationsRepository };
