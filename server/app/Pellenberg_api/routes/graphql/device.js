
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
  GraphQLInterfaceType,
} from 'graphql';

import { ResearcherType } from './researcher';
import { AttributeType } from './attribute';



export const DeviceType = new GraphQLObjectType({
  name: 'Device',
  fields: () => ({
    registered_by: {
      type: ResearcherType,
      resolve: (obj, args, {loaders}) => loaders.researcher.load(obj.registered_by),
    },
    date_added: {
      type: GraphQLString,
    },
    cuid: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    functions: {
      type: new GraphQLList(GraphQLString),
    },
    producer: {
      type: GraphQLString,
    },
    uri: {
      type: GraphQLString,
    },
    attributes: {
      type: new GraphQLList(AttributeType),
    },
  })
});
