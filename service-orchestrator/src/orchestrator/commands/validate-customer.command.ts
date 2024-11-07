import { ICommand } from '@nestjs/cqrs';

export class ValidateConsumerCommand implements ICommand {
  constructor(
    public readonly customerData: {
      readonly document: string;
      readonly name: string;
      readonly email: string;
      readonly phone: string;
    },
  ) {}
}
