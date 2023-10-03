export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      savedBooks
    }
  }
`;