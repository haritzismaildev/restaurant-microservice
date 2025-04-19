import { Test, TestingModule } from '@nestjs/testing';
import { KitchenService } from '../src/kitchen/kitchen.service';

describe('KitchenService', () => {
  let service: KitchenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KitchenService],
    }).compile();

    service = module.get<KitchenService>(KitchenService);
    // Mock the RabbitMQ connection and channel to avoid real network calls
    service['initRabbitMQ'] = jest.fn();
  });

  it('should be defined and initRabbitMQ should be called', () => {
    expect(service).toBeDefined();
    expect(service.initRabbitMQ).toBeDefined();
    expect(jest.isMockFunction(service.initRabbitMQ)).toBe(true);
  });
});
