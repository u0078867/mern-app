

export function extractOptionTitle(options, value) {
  let option = options.find(o => o.enum[0] == value);
  let optionTitle = option ? option.title : value;
  return optionTitle;
}

export function titleizeAttribute(attributes, attributesSchema, attributeName) {
  let attribute = attributes.find(a => a.name == attributeName);
  let attributeSchema = attributesSchema.items.find(a => a.properties.name.default == attributeName);
  let attributeOut = JSON.parse(JSON.stringify(attribute));
  attribute.value = attribute.value || attribute.string_value || attribute.numeric_value || attribute.boolean_value;
  if (attributeSchema.properties.name.type == 'string' && attributeSchema.properties.name.anyOf) {
    attributeOut.name = extractOptionTitle(attributeSchema.properties.name.anyOf, attribute.name);
  }
  if (attributeSchema.properties.value.type == 'string' && attributeSchema.properties.value.anyOf) {
    attributeOut.value = extractOptionTitle(attributeSchema.properties.value.anyOf, attribute.value);
  }
  if (attributeSchema.properties.uom && attributeSchema.properties.uom.anyOf) {
    attributeOut.uom = extractOptionTitle(attributeSchema.properties.uom.anyOf, attribute.uom);
  }
  return attributeOut;
}

export function titleizeOutput(output, outputsSchema) {
  let outputName = output.name;
  let outputSchema = outputsSchema.items.find(o => o.properties.name.default == outputName);
  let outputOut = JSON.parse(JSON.stringify(output));

  outputOut.name = extractOptionTitle(outputSchema.properties.name.anyOf, output.name);

  if (outputOut.metadata) {
    for (var [i, attribute] of outputOut.metadata.entries()) {
      outputOut.metadata[i] = titleizeAttribute(output.metadata, outputSchema.properties.metadata, attribute.name);
    }
  }

  if (outputOut.data) {
    for (var [i, attribute] of outputOut.data.entries()) {
      outputOut.data[i] = titleizeAttribute(output.data, outputSchema.properties.data, attribute.name);
    }
  }

  return outputOut;



}
