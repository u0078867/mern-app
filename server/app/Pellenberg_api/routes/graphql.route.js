var graphqlHTTP = require('express-graphql');

import {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';


import { ActivityType } from './graphql/activity';
import { SessionType } from './graphql/session';

import { createLoaders } from '../dataLoaders';

import {
  getActivitiesBySession,
  getAllSessions
} from '../dataServices/activity.search.service';



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
    },
    allSessions: {
      type: new GraphQLList(SessionType),
      resolve: (root, args, {loaders}) => getAllSessions(),
    }
  }),
});


var schema = new GraphQLSchema({query: QueryType});

var route = graphqlHTTP({
  context: { loaders },
  schema: schema,
  graphiql: process.env.NODE_ENV === 'development',
});

module.exports = route;
