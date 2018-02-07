
import _ from 'lodash';
import DataLoader from 'dataloader';


export function createLoader(getter) {
  return new DataLoader(cuids => {
      return getter(cuids).then(items => {
          const itemsById = _.keyBy(items, "cuid");
          return cuids.map(cuid => itemsById[cuid]);
      });
  });
}
