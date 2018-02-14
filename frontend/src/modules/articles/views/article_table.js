import React from 'react'
import { Table, Icon, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { getTime } from '../../../utils/time'

const RedirectButton = ({history, path, label}) => (
  <Button onClick={() => {
    history.push(path)
  }}>
      {label}
  </Button>
)



const ArticleRow = ({title, author, created_at, updated_at, id, history}) => (
    <Table.Row key={id}>
      <Table.Cell collapsing>
        <Icon name='star' /> {title}
      </Table.Cell>
      <Table.Cell>{author.name}</Table.Cell>
      <Table.Cell>{getTime(created_at)}</Table.Cell>
      <Table.Cell>{getTime(updated_at)}</Table.Cell>
      <Table.Cell>
        {/* View Article */}
        <RedirectButton history={history} label="View" path={{
            pathname: '/dashboard/article/' + id
          }} />
        {/* Update Article */}
        <RedirectButton history={history} label="Update" path={`/dashboard/article/${id}/update`} />
      </Table.Cell>
    </Table.Row>
)

const RouterWrapRow = withRouter(ArticleRow)
  
 const ArticleTable = ({ data }) => (
  <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell >Title</Table.HeaderCell>
        <Table.HeaderCell >Author</Table.HeaderCell>
        <Table.HeaderCell >Created At</Table.HeaderCell>
        <Table.HeaderCell >Updated At</Table.HeaderCell>
        <Table.HeaderCell textAlign="center">
          <Icon name='setting' size="large" />
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
          
    <Table.Body>
      {
        data &&
        data.map((row, index) => (
          <RouterWrapRow key={index} {...row} />
          ))
      }
    </Table.Body>
  </Table>
)

export default withRouter(ArticleTable)