
import gql from 'graphql-tag';

const GET_COMMITS = gql`
  query getCommits($name: String!) {
    repository(owner: "the-road-to-learn-react", name: $name) {
      object(expression: "master") {
        ... on Commit {
          history {
            nodes {
              author {
                name
              }
            }
            totalCount
          }
        }
      }
    }
  }
`;

const GET_REPOSITORIES = gql`
  query getRepositories {
    organization(login: "the-road-to-learn-react") {
      repositories(first: 20) {
        edges {
          node {
            id
            name
            url
            viewerHasStarred
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export { GET_COMMITS, GET_REPOSITORIES };