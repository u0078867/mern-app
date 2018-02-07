var graphqlHTTP = require('express-graphql');

import {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';


import { ActivityType } from './graphql/activity';

import { createLoaders } from '../dataLoaders';

import { getActivitiesBySession } from '../dataServices/activity.search.service';



var loaders = createLoaders();


const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    activitiesBySession: {
      type: new GraphQLList(ActivityType),
      args: {
        session: { type: GraphQLString }
      },
      resolve: (root, args, {loaders}) => getActivitiesBySession(args.session),
    }
  }),
});


var schema = new GraphQLSchema({query: QueryType});

var route = graphqlHTTP({
  context: { loaders },
  schema: schema,
  graphiql: true,
});

module.exports = route;
