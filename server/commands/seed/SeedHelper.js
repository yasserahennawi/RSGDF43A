import * as Q from 'q';
import * as _ from 'lodash';
import IoC from 'AppIoC';

export default class SeedHelper {
  randomInteger(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  oneOf(choices) {
    return choices[ this.randomInteger(0, choices.length) ];
  }

  getRandomNumbers(no, generator) {
    let arr = []
    while(arr.length < no){
      let randomnumber = generator();
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
    }
    return arr;
  }

  async getRandomNames(viewer, no, repository) {
    const data = await repository.find(viewer, { });
    const names = _.map(data, 'name');

    return this.getRandomNumbers(no, () => this.randomInteger(0, names.length - 1))
      .map(rand => names[rand]);
  }

  async getRandomIds(viewer, repository, number) {
    const names = await this.getRandomNames(viewer, number, repository);
    return await Q.all(
      names.map(name => repository.find(viewer, { name }))
    )
    .then(models => _.flatten(models).map(model => model._id));
  }

  async getRandomId(viewer, repository) {
    const data = await repository.find(viewer, { });
    const names = _.map(data, 'name');

    const randomName = names[ this.randomInteger(0, names.length - 1) ];

    const result = await repository.find(viewer, {
      name: randomName,
    });
    return result[0]._id;
  }
}

IoC.singleton('seedHelper', [], SeedHelper);
