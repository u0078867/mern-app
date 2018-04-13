
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



export const SessionType = new GraphQLObjectType({
  name: 'Session',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    count: {
      type: GraphQLInt,
    },
  })
});
