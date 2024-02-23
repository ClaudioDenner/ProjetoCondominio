import { Test, TestingModule } from '@nestjs/testing';
import { HousingsService } from './housings.service';

describe('HousingsService', () => {
  let service: HousingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HousingsService],
    }).compile();

    service = module.get<HousingsService>(HousingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
