const { User, Book } = require('../models');
// const bookSchema = require('../models/Book');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('savedBooks');
    },
    books: async () => {
        return Book.find().sort({ title: 1 })
    },
    bookById: async (parent, { bookId }) => {
        return Book.findOne({ _id: bookId });
    },
    booksByTitle: async (parent, { title }) => {
        return Book.find({ title });
    },
    booksByAuthor: async (parent, {author}) => {
        return Book.find({author});
    },
    myBooks: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      } else {
        throw new AuthenticationError('You need to be logged in!');
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    // adding books
    addBook: async (parent, {authors, description, bookId, image, link, title}) => {
        const book = await Book.create({authors, description, bookId, image, link, title});
        return { book };
    },
    saveBook: async (parent, { bookId }, context) => {
      // Mutation to save a book to the user's account.
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookId } },
          { new: true }
        );
        return user;
      } else {
        throw new AuthenticationError('You need to be logged in to save books.');
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      // Mutation to remove a book from the user's saved books.
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookId } },
          { new: true }
        );
        return user;
      } else {
        throw new AuthenticationError('You need to be logged in to remove books.');
      }
    },
  }
};

module.exports = resolvers;
