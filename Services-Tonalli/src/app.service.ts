import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      name: 'Tonalli API',
      description: 'Web3 Educational Platform on Stellar Blockchain',
      version: '1.0.0',
      characters: ['Chima (mariachi woman)', 'Alli (mariachi man)', 'Xollo (xoloescuincle)'],
      network: process.env.STELLAR_NETWORK || 'testnet',
      docs: '/api',
    };
  }
}
