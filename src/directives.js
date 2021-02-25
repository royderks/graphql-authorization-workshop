const { defaultFieldResolver } = require('graphql');
const { SchemaDirectiveVisitor } = require('apollo-server-express');

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { isAuthenticated, role } = this.args; // The arguments for the directive

    field.resolve = async (root, args, context, info) => {
      const fieldValue = await resolve(root, args, context, info);
      const { user } = context;

      console.log({ isAuthenticated, user });

      // Throw an error when there is no authenticated user
      if (isAuthenticated && !user) {
        return new Error(`Only authenticated users can access ${field.name}`);
      }

      // Throw an error when the user requests a field with the wrong role
      if (user.role !== role) {
        return new Error(
          `Only users with the role ${role} can access ${field.name}`,
        );
      }

      return fieldValue;
    };
  }
}

module.exports = AuthDirective