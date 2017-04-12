/* tslint:disable */

declare var Object: any;
export interface S3ImagesInterface {
  "Name": any;
  "Key": any;
  "LastModified": any;
  "ETag": any;
  "Size": any;
  "StorageClass": any;
  "id"?: any;
}

export class S3Images implements S3ImagesInterface {
  "Name": any;
  "Key": any;
  "LastModified": any;
  "ETag": any;
  "Size": any;
  "StorageClass": any;
  "id": any;
  constructor(data?: S3ImagesInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `S3Images`.
   */
  public static getModelName() {
    return "S3Images";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of S3Images for dynamic purposes.
  **/
  public static factory(data: S3ImagesInterface): S3Images{
    return new S3Images(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'S3Images',
      plural: 'S3Images',
      properties: {
        "Name": {
          name: 'Name',
          type: 'any'
        },
        "Key": {
          name: 'Key',
          type: 'any'
        },
        "LastModified": {
          name: 'LastModified',
          type: 'any'
        },
        "ETag": {
          name: 'ETag',
          type: 'any'
        },
        "Size": {
          name: 'Size',
          type: 'any'
        },
        "StorageClass": {
          name: 'StorageClass',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
