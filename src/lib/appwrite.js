import { Account, Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6789e414001a5883c04c');

export const account = new Account(client);
export const databases = new Databases(client);

export const RESUME_DATABASE_ID = '678b2d0e002d5de54c14';
export const RESUME_COLLECTION_ID = '678b2d4c0038a0f90108';