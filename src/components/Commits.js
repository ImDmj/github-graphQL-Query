import React from 'react';
import { Query } from 'react-apollo';
import sortBy from 'sort-by';
import { GET_COMMITS } from '../queries';

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

const Commits = ({ repoInfo }) => {
  return (
    <Query query={GET_COMMITS} variables={{ name: repoInfo.name }}>
      {({ data, loading }) => {
        if (loading || !data) {
          return <div>Loading...</div>;
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
              <li className="list-group-item">
                <strong>
                  Authors
                  <span className="pull-right">Commits</span>
                </strong>
              </li>
              {sortedTally.map(singleAuthor => (
                <li
                  className="list-group-item"
                  key={singleAuthor.name}
                >
                  <span className="badge" data-testid="commit-count">
                    {singleAuthor.count}
                  </span>
                  <i
                    className="glyphicon glyphicon-user"
                    title="Author"
                  />{' '}
                  {singleAuthor.name}
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};

export default Commits;