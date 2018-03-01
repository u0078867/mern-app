
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

import { AttributeType } from './attribute';

import { ActivityType } from './activity';

export const FileDataType = new GraphQLObjectType({
  name: 'FileData',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    storage_uri: {
      type: GraphQLString,
    },
    size: {
      type: GraphQLFloat,
    },
    type: {
      type: GraphQLString,
    },
  })
});

export const OutputType = new GraphQLObjectType({
  name: 'Output',
  fields: () => ({
    cuid: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    files_data: {
      type: new GraphQLList(FileDataType),
    },
    metadata: {
      type: new GraphQLList(AttributeType),
    },
    data: {
      type: new GraphQLList(AttributeType),
    },
    activity: {
      type: ActivityType,
    },
  })
});
