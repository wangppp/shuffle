import React from 'react'
import { Table, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getTime } from '../../../utils/time'




const ArticleRow = ({title, author, created_at, updated_at, id}) => (
    <Table.Row key={id}>
      <Table.Cell collapsing>
        <Icon name='star' /> {title}
      </Table.Cell>
      <Table.Cell>{author.name}</Table.Cell>
      <Table.Cell>{getTime(created_at)}</Table.Cell>
      <Table.Cell>{getTime(updated_at)}</Table.Cell>
      <Table.Cell>
        <Button>
          <Link to={{
            pathname: '/dashboard/article/' + id
          }}>
            View
          </Link>
        </Button>
      </Table.Cell>
    </Table.Row>
)
  
export const ArticleTable = ({ data }) => (
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
          <ArticleRow key={index} {...row} />
          ))
      }
    </Table.Body>
  </Table>
)