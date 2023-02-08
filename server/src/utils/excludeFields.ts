//Prisma Client doesn't have a native way of excluding fields yet

export const excludeFields = <User, Key extends keyof User>(
  users: User | User[],
  keys: Key[]
): Omit<User, Key> | Omit<User, Key>[] => {
  if (Array.isArray(users)) {
    return users.map((user) => {
      for (let key of keys) {
        delete user[key];
      }
      return user;
    });
  } else {
    for (let key of keys) {
      delete users[key];
    }
    return users;
  }
};

//alternative: add a select option object to the query. ex:
// const user = await prisma.user.create({
//   data: {
//     username,
//     email,
//     name,
//     password: await bcrypt.hash(password, 10),
//   },
//   select: {
//     id: true,
//     username: true,
//     email: true,
//     name: true,
//   },
// });

/*Omit is a built-in type in TypeScript that allows you to create a new type that excludes certain properties from another type.

For example, if you have a type User with properties username, email, and password, you can create a new type SafeUser that excludes the password property using Omit<User, 'password'>.

This can be useful in situations where you want to return a subset of an object to the client without including sensitive information such as passwords or secret keys.

The Omit type is a generic type and takes two parameters: the first is the original type, and the second is a union of key names that you want to exclude from the new type. The resulting type will be a new type that has all the properties of the original type except for the ones specified in the second parameter. */
