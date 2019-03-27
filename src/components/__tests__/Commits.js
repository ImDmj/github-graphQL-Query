import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_COMMITS } from '../../queries';
import Commits from '../Commits';
import { wait } from '../../utils/wait';

const mocks = [
  {
    request: {
      query: GET_COMMITS,
      variables: {
        name: 'the-road-to-learn-react',
      },
    },
    result: {
      data: {
        repository: {
          object: {
            history: {
              nodes: [
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Anna Ira Hurnaus',
                  },
                },
                {
                  author: {
                    name: 'Anna Ira Hurnaus',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Jonathas Carrijo',
                  },
                },
                {
                  author: {
                    name: 'Jonathas Carrijo',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'John-Kim Murphy',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'tsvecak',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Alexey Pyltsyn',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Will Humphreys',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Mansoor Ali',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Tien Pham',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
                {
                  author: {
                    name: 'Mansoor Ali',
                  },
                },
                {
                  author: {
                    name: 'Robin Wieruch',
                  },
                },
              ],
              totalCount: 517,
            },
          },
        },
      },
    },
  },
];

afterEach(cleanup);

describe('<Commits />', () => {
  test('Renders correctly', async () => {
    expect(
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Commits repoInfo={{ name: 'the-road-to-learn-react' }} />
        </MockedProvider>,
      ),
    ).toBeTruthy();
  });

  test('Author name display works properly', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Commits repoInfo={{ name: 'the-road-to-learn-react' }} />
      </MockedProvider>,
    );

    await wait(0);
    expect(getByText('John-Kim Murphy')).toBeTruthy();
    expect(getByText('Robin Wieruch')).toBeTruthy();
    expect(getByText('Jonathas Carrijo')).toBeTruthy();
    expect(getByText('Mansoor Ali')).toBeTruthy();
    expect(getByText('Anna Ira Hurnaus')).toBeTruthy();
  });

  test('Total commits display works properly', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Commits repoInfo={{ name: 'the-road-to-learn-react' }} />
      </MockedProvider>,
    );

    await wait(0);
    expect(getByText('Total Commits: 517')).toBeTruthy();
  });

  test('Individual commits display works properly', async () => {
    const { getByText, getAllByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Commits repoInfo={{ name: 'the-road-to-learn-react' }} />
      </MockedProvider>,
    );

    await wait(0);

    expect(getAllByTestId('commit-count')).toBeTruthy();
  });
});