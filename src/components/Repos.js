import React from 'react';
import { Query } from 'react-apollo';
import Commits from './Commits';
import { GET_REPOSITORIES } from '../queries';

const Repos = () => {
  return (
    <Query query={GET_REPOSITORIES}>
      {({ data, loading }) => {
        if (loading || !data) {
          return <div>Loading...</div>;
        } else {
          const {
            organization: {
              repositories: { edges: repos },
            },
          } = data;
          return (
            <div>
              {repos.map(({ node: repoInfo }) => (
                <div
                  className="panel panel-default"
                  key={repoInfo.name}
                >
                  <div className="panel-heading">
                    <div className="row">
                      <div className="col-md-9">
                        <h2>Repo: {repoInfo.name}</h2>
                      </div>
                      <div className="col-md-3">
                        <h3 className="pull-right">
                          Total stars:{' '}
                          {repoInfo.stargazers.totalCount}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body">
                    <Commits repoInfo={repoInfo} />
                  </div>
                </div>
              ))}
            </div>
          );
        }
      }}
    </Query>
  );
};

export default Repos;