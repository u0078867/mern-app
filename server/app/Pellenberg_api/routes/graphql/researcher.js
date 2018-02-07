
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



export const ResearcherType = new GraphQLObjectType({
  name: 'Researcher',
  fields: () => ({
    date_added: {
      type: GraphQLString,
    },
    cuid: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    surname: {
      type: GraphQLString,
    },
    birthdate: {
      type: GraphQLString,
    },
    institution_id: {
      type: GraphQLString,
    },
  })
});
