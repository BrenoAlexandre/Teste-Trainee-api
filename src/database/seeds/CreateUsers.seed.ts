import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import User from '../entities/User.Entity';
import { Role } from '../../models/user.model';

export default class CreateProducts implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
    const rows = await connection.getRepository(User).count();
    if (rows <= 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            name: 'John doe',
            cpf: '03317892045',
            birthdate: '30/12/2003',
            obs: '',
            role: Role.admin,
          },
          {
            name: 'John No Doe',
            cpf: '12312312311',
            birthdate: '12/11/2001',
            obs: 'Ele não tem dor',
            role: Role.user,
          },
        ])
        .execute();
    }
  }
}
