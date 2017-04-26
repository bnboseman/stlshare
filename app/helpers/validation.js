let getMissingFields = (required_fields, body) => {
  let missingfields = [];
  for (let i=0; i<required_fields.length; i++) {
    const field = required_fields[i];
    if (!(field in body)) {
      missingfields.push(field);
    }
  }

  return missingfields;
}

module.exports = {getMissingFields};
