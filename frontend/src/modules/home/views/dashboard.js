import React, {
  Component
} from 'react';
import {
  Table,
  Icon
} from 'semantic-ui-react';

const table_data = {
  headers: ['Title', 'Author', 'Comments', 'Views'],
  rows: [
    {
      id: 1,
      title: 'A song by Lily',
      author: 'admin',
      comments: '100 total',
      views: '10,001 total'
    },
    {
      id: 2,
      title: 'A song by Lily',
      author: 'admin',
      comments: '100 total',
      views: '10,001 total'
    },
    {
      id: 3,
      title: 'A song by Lily',
      author: 'admin',
      comments: '100 total',
      views: '10,001 total'
    },{
      id: 4,
      title: 'A song by Lily',
      author: 'admin',
      comments: '100 total',
      views: '10,001 total'
    },
    {
      id: 5,
      title: 'A song by Lily',
      author: 'admin',
      comments: '100 total',
      views: '10,001 total'
    }
  ]
}

const ArticleRow = ({title, author, views, comments, id}) => (
  <Table.Row id={id}>
    <Table.Cell collapsing>
      <Icon name='article' /> {title}
    </Table.Cell>
    <Table.Cell>{author}</Table.Cell>
    <Table.Cell>{views}</Table.Cell>
    <Table.Cell>{comments}</Table.Cell>
  </Table.Row>
)

class Dashboard extends Component {
  render() {
    return ( 
      <div >
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              {
                table_data.headers.map(header => (
                  <Table.HeaderCell>{header}</Table.HeaderCell>
                ))
              }
            </Table.Row>
          </Table.Header>
                
          <Table.Body>
              {
                table_data.rows.map(row => (
                  <ArticleRow {...row} />
                ))
              }
          </Table.Body>
      </Table>
      </div>
    );
  }
}

export default Dashboard;