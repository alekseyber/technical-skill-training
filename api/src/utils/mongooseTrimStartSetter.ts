export function trimStartSetter(val, priorValue, schemaType) {
  if (schemaType.options.trimStart && typeof val === 'string') {
    return val.trimStart();
  }
  return val;
}
