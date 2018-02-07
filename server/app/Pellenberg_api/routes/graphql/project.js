
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



export const ProjectType = new GraphQLObjectType({
  name: 'Project',
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
    description: {
      type: GraphQLString,
    },
    begin_period: {
      type: GraphQLString,
    },
    end_period: {
      type: GraphQLString,
    },
    uri: {
      type: GraphQLString,
    },
  })
});
