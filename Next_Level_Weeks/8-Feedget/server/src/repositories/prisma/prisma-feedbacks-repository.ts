import { db } from '../../../prisma';
import {
  FeedbackCreateData,
  FeedbacksRepository,
} from '../feedbacks-repository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbackCreateData) {
    await db.feedback.create({
      data,
    });
  }
}
