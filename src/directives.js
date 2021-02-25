const { defaultFieldResolver } = require('graphql');
const { SchemaDirectiveVisitor } = require('apollo-server-express');

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { isAuthenticated, role } = this.args; // The arguments for the directive

    field.resolve = async (root, args, context, info) => {
      const fieldValue = await resolve(root, args, context, info);

      return fieldValue;
    };
  }
}

module.exports = AuthDirective;
