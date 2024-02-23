import { Test, TestingModule } from '@nestjs/testing';
import { HousingsController } from './housings.controller';
import { HousingsService } from './housings.service';

describe('HousingsController', () => {
  let controller: HousingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousingsController],
      providers: [HousingsService],
    }).compile();

    controller = module.get<HousingsController>(HousingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
