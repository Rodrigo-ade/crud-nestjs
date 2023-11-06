import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperService {
  dtoToClass<T>(dtoObject: any, classObject: T): T {
    for (const property in dtoObject) {
      if (
        dtoObject.hasOwnProperty(property) &&
        typeof dtoObject[property] !== 'function'
      ) {
        (classObject as any)[property] = dtoObject[property];
      }
    }

    return classObject;
  }

  classToEntity<T>(classInstance: T, entity: any): any {
    const classKeys = Object.keys(classInstance as any);
    classKeys.forEach((key) => {
      if (typeof (classInstance as any)[key] !== 'function') {
        entity[key] = (classInstance as any)[key];
      }
    });

    return entity;
  }

  entityToClass<T>(entityObject: any, classObject: T): T {
    for (const property in entityObject) {
      if (
        entityObject.hasOwnProperty(property) &&
        typeof entityObject[property] !== 'function'
      ) {
        (classObject as any)[property] = entityObject[property];
      }
    }
    return classObject;
  }
}
