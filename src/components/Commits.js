import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import sortBy from 'sort-by';

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
  const formattedTally = Object.entries(commitTally).map(
    ([authorName, commitCount]) => ({
      name: authorName,
      count: commitCount,
    }),
  );
  const sortedTally = formattedTally.sort(sortBy('-count'));
  return sortedTally.slice(0, 5);
};

const Commits = ({repoInfo}) =>{
    return (
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
              <h3>Total Commits: {totalCount}</h3>
              <ul className="list-group">
                <li className="list-group-item"><strong>Authors 
                    <span className="pull-right">Commits</span>
                    </strong>
                </li>
                {sortedTally.map(singleAuthor => (
                  <li class="list-group-item">
                  <span class="badge">{singleAuthor.count}</span>
                    <i className="glyphicon glyphicon-user" title="Author"></i>
                    {' '}{singleAuthor.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    );
}

export default Commits;
