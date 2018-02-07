
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { ResearcherType } from './researcher';



export const SWToolType = new GraphQLObjectType({
  name: 'SWTool',
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
    version: {
      type: GraphQLString,
    },
    producer: {
      type: GraphQLString,
    },
    uri: {
      type: GraphQLString,
    },
  })
});
