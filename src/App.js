import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import sortBy from 'sort-by';
import './App.css';

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

const countCommits = commits => {
  const commitTally = {};
  commits.forEach(author => {
    const {
      author: { name },
    } = author;
    if (!commitTally[name]) {
      commitTally[name] = 1;
    } else {
      commitTally[name]++;
    }
  });
  console.log(commitTally);
  const formattedTally = Object.entries(commitTally).map(
    ([authorName, commitCount]) => ({
      name: authorName,
      count: commitCount,
    }),
  );
  const sortedTally = formattedTally.sort(sortBy('-count'));
  console.log(sortedTally);
  return sortedTally.slice(0, 5);
};

export default () => (
  <React.Fragment>
    <Query query={GET_REPOSITORIES}>
      {({ data, loading }) => {
        if (loading || !data) {
          return <div>Loading</div>;
        } else {
          const {
            organization: {
              repositories: { edges: repos },
            },
          } = data;
          return (
            <div>
              {repos.map(
                ({ node: repoInfo }) =>
                  console.log(repoInfo) || (
                    <div>
                      <h2>Repo: {repoInfo.name}</h2>
                      <h3>
                        Total stars: {repoInfo.stargazers.totalCount}
                      </h3>
                      <Query
                        query={GET_COMMITS}
                        variables={{ name: repoInfo.name }}
                      >
                        {({ data, loading }) => {
                          if (loading || !data) {
                            return <div>Loading</div>;
                          }
                          const {
                            repository: {
                              object: {
                                history: { nodes, totalCount },
                              },
                            },
                          } = data;
                          const sortedTally = countCommits(nodes);
                          return (
                            <div>
                              <h2>Total Commits: {totalCount}</h2>
                              <ul>
                                {sortedTally.map(singleAuthor => (
                                  <li>
                                    Author: {singleAuthor.name}:{' '}
                                    Commit Count: {singleAuthor.count}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        }}
                      </Query>
                      <hr />
                    </div>
                  ),
              )}
            </div>
          );
        }
      }}
    </Query>
  </React.Fragment>
);
