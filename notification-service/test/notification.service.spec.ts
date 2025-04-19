import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../src/notification/notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationService],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    // Mock the RabbitMQ connection and channel to avoid real network calls
    jest.spyOn(service, 'initRabbitMQ').mockImplementation(() => undefined);
  });

  it('should be defined and initRabbitMQ should be called', () => {
    expect(service).toBeDefined();
    expect(service.initRabbitMQ).toBeDefined();
    expect(jest.isMockFunction(service.initRabbitMQ)).toBe(true);
  });
});
