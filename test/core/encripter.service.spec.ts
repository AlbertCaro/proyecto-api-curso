import { EncrypterService } from '../../src/core/encrypter.service';
import * as bcrypt from 'bcrypt';

describe('EncripterService', () => {
  let sut: EncrypterService;

  beforeEach(() => {
    sut = new EncrypterService();
  });

  it('should return a fully functional encrypted value', async () => {
    const hash = await sut.encrypt('picapapas');

    const result = await bcrypt.compare('picapapas', hash);

    expect(result).toBeTruthy();
  });
});
