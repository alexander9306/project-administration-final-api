import { Test, TestingModule } from '@nestjs/testing';
import { ArticulosResolver } from './articulos.resolver';
import { ArticulosService } from './articulos.service';

describe('ArticulosResolver', () => {
  let resolver: ArticulosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticulosResolver, ArticulosService],
    }).compile();

    resolver = module.get<ArticulosResolver>(ArticulosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
