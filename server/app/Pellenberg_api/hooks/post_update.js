
import { createLoaders } from '../dataLoaders';

var loaders = createLoaders();

export default function (saved, loaderName) {
  let loader = loaders[loaderName];
  let key = saved.cuid;
  console.log(`cleaning ${loaderName} loader cache for key ${key}`);
  loader.clear(key);
}
