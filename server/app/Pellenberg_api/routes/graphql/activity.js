
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
import { SubjectType } from './subject';
import { DeviceType } from './device';
import { SWToolType } from './software';
import { ProjectType } from './project';
import { PublicationType } from './publication';
import { OutputType } from './output';



export const ResearchersType = new GraphQLObjectType({
  name: 'Researchers',
  fields: () => ({
    data: {
      type: ResearcherType,
      resolve: (obj, args, {loaders}) => loaders.researcher.load(obj.id),
    }
  })
});

export const SubjectsType = new GraphQLObjectType({
  name: 'Subjects',
  fields: () => ({
    data: {
      type: SubjectType,
      resolve: (obj, args, {loaders}) => loaders.subject.load(obj.id),
    },
    task: {
      type: GraphQLString,
    },
    anatomical_areas: {
      type: new GraphQLList(GraphQLString),
    },
    anatomical_side: {
      type: GraphQLString,
    },
  })
});

export const DevicesType = new GraphQLObjectType({
  name: 'Devices',
  fields: () => ({
    roles: {
      type: new GraphQLList(GraphQLString),
    },
    data: {
      type: DeviceType,
      resolve: (obj, args, {loaders}) => loaders.device.load(obj.id),
    }
  })
});

export const SWToolsType = new GraphQLObjectType({
  name: 'SWTools',
  fields: () => ({
    roles: {
      type: new GraphQLList(GraphQLString),
    },
    data: {
      type: SWToolType,
      resolve: (obj, args, {loaders}) => loaders.software.load(obj.id),
    }
  })
});

export const ProjectsType = new GraphQLObjectType({
  name: 'Projects',
  fields: () => ({
    data: {
      type: ProjectType,
      resolve: (obj, args, {loaders}) => loaders.project.load(obj.id),
    }
  })
});

export const PublicationsType = new GraphQLObjectType({
  name: 'Publications',
  fields: () => ({
    data: {
      type: PublicationType,
      resolve: (obj, args, {loaders}) => loaders.publication.load(obj.id),
    }
  })
});

export const DataType = new GraphQLObjectType({
  name: 'Data',
  fields: () => ({
    roles: {
      type: new GraphQLList(GraphQLString),
    },
    data: {
      type: OutputType,
      resolve: (obj, args, {loaders}) => loaders.output.load(obj.id),
    }
  })
});

export const ActivityType = new GraphQLObjectType({
  name: 'Activity',
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
    type: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    session: {
      type: GraphQLString,
    },
    datetime_ended: {
      type: GraphQLString,
    },
    researchers: {
      type: new GraphQLList(ResearchersType),
    },
    subjects: {
      type: new GraphQLList(SubjectsType),
    },
    devices: {
      type: new GraphQLList(DevicesType),
    },
    software: {
      type: new GraphQLList(SWToolsType),
    },
    projects: {
      type: new GraphQLList(ProjectsType),
    },
    publications: {
      type: new GraphQLList(PublicationsType),
    },
    data: {
      type: new GraphQLList(DataType),
    },
    outputs: {
      type: new GraphQLList(OutputType),
    },
  })
});
