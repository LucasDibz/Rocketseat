import { Specification } from '../../model/Specification';
import {
  ISpecificationsRepository,
  ISpecificationDTO,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  //singleton
  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE)
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();

    return this.INSTANCE;
  }

  create({ name, description }: ISpecificationDTO) {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  list() {
    return this.specifications;
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (specification) => specification.name === name,
    );

    return specification;
  }
}

export { SpecificationsRepository };
