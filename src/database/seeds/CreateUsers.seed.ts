import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import bcrypt from 'bcrypt';
import User from '../entities/User.Entity';
import { Role } from '../../models/user.model';
import config from '../../config/config';

export default class CreateProducts implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
    const rows = await connection.getRepository(User).count();
    if (rows <= 0) {
      const salt = await bcrypt.genSalt(config.saltWorkFactor);
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            name: 'Admin master',
            cpf: '00000000000',
            password: await bcrypt.hash('123123admin', salt),
            birthdate: '12/30/2002',
            obs: '',
            role: Role.admin,
          },
          {
            name: 'John Doe',
            cpf: '12312312311',
            password: await bcrypt.hash('123123', salt),
            birthdate: '12/11/2001',
            obs: 'Usuário da plataforma',
            role: Role.user,
          },
        ])
        .execute();
    }
  }
}
