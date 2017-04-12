/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { S3Images } from '../../models/S3Images';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    S3Images: S3Images,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
