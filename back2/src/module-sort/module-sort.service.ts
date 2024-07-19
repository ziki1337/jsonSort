import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface User {
  email: string;
  number: string;
}

@Injectable()
export class ModuleSortService {
    private readonly data: User[];

    constructor() {
      const filePath = path.join(__dirname, '..', '..', 'data.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    this.data = JSON.parse(rawData);
    }

    async find(email: string, number?: string): Promise<User[]> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const result = this.data.filter(user => {
            return user.email === email && (number ? user.number === number : true);
          });
          resolve(result);
        }, 5000);
      });
  }

}
