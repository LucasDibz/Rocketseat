import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment?: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('Type is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid Screenshot Format');
    }

    if (!comment && !screenshot) {
      throw new Error('Comment or Screenshot is required');
    }

    await this.feedbacksRepository.create({ type, comment, screenshot });

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color:#7a4a4a">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Tipo do comentário: ${comment}</p>`,
        '</div>',
      ].join('\n'),
    });
  }
}
