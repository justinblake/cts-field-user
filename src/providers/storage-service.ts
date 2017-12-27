import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()

/** methods for reading and writing from storage */
export class StorageService {
  constructor (private storage: Storage) {
    console.log('Hello StorageService Provider');
  }
  add(key:string, value:any):Promise<any>{
    return this.createOrUpdate(key, value);
  }
  update(key:string, value:any):Promise<any>{
    return this.createOrUpdate(key, value);
  }
  createOrUpdate(key:string, value:any):Promise<any>{
    return this.storage.set(key, value)
  }
  get(key:string):Promise<any>{
    return this.storage.get(key);
  }
  deleteKey(key:string):Promise<any>{
    return this.storage.remove(key);
  }
  getAllKeys():any{
    return this.storage.keys();
  }
}
