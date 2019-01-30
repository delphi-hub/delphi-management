import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Instance, ComponentType, StateEnum } from './model/models/instance';
import * as Faker from 'faker';
export class InMemoryDataService implements InMemoryDbService {
    private types: Array<ComponentType> = ['Crawler', 'WebApi', 'WebApp', 'DelphiManagement', 'ElasticSearch'];
    private states: Array<StateEnum> = ['Running' , 'Failed' , 'Stopped' , 'Paused' , 'NotReachable'];
  createDb() {
      // SysInfo
      // Instance
      // number
    const instances: Array<Instance> = [];

    for ( let i = 0; i < Faker.random.number({min: 0, max: 20}); i++) {
        instances.push({
            id: Faker.random.number(),
            host: Faker.internet.ip(),
            portNumber: Faker.random.number(),
            name: Faker.name.findName(),
            linksTo: [],
            linksFrom: [],
            componentType: this.types[Faker.random.number({min: 0, max: 4})],
            dockerId: Faker.random.alphaNumeric(),
            instanceState: this.states[Faker.random.number({min: 0, max: 4})],
            labels: []
        });
    }
    const systemInfo = {
        javaVersion: Faker.system.semver(),
        hostName: Faker.internet.ip(),
        platformName: Faker.system.fileType(),
        scalaVersion: Faker.system.semver()
    };
    console.log('instances', instances);
    const numberOfInstances = Faker.random.number({min: 0});
    return { instances: instances, systemInfo: systemInfo, numberOfInstances: numberOfInstances, postInstance: {} };
  }
}
