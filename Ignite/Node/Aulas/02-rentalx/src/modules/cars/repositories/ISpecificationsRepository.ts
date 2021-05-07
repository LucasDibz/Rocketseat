import { Specification } from '../model/Specification';

export interface ISpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create({ name, description }: ISpecificationDTO): void;
  list(): Specification[];
  findByName(name: string): Specification;
}
