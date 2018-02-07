
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



export const NumericAttributeType = new GraphQLObjectType({
  name: 'NumericAttribute',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    value: {
      type: GraphQLFloat,
    },
    uom: {
      type: GraphQLString,
    }
  })
});

export const StringAttributeType = new GraphQLObjectType({
  name: 'StringAttribute',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    value: {
      type: GraphQLString,
    },
  })
});

export const BooleanAttributeType = new GraphQLObjectType({
  name: 'BooleanAttribute',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    value: {
      type: GraphQLBoolean,
    },
  })
});

export const NoValueAttributeType = new GraphQLObjectType({
  name: 'NoValueAttribute',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    uom: {
      type: GraphQLString,
    }
  })
});

export const AttributeType = new GraphQLUnionType({
  name: 'Attribute',
  types: [
    NumericAttributeType,
    StringAttributeType,
    BooleanAttributeType,
    NoValueAttributeType
  ],
  resolveType: (value) => {
    switch (typeof value.value) {
      case 'number':
        return NumericAttributeType;
      case 'string':
        return StringAttributeType;
      case 'boolean':
        return BooleanAttributeType;
      default:
        return NoValueAttributeType;
    }
  }
});
