import React from 'react'
import { connect } from 'react-redux'
import { Table, Icon, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { getTime } from '../../../utils/time'
import { downArticle } from '../actions'

const RedirectButton = ({history, path, icon, ...props}) => (
  <Button
    {...props}
    icon={icon}
    size="mini"
    onClick={() => {
      history.push(path)
    }}
  >
  </Button>
)

const ArticleRow = ({
    title,
    author,
    created_at,
    updated_at,
    id,
    history,
    post_state,
    clickDownButton
  }) => (
    <Table.Row key={id}>
      <Table.Cell collapsing>
        <Icon name='star' /> {title}
      </Table.Cell>
      <Table.Cell>{author.name}</Table.Cell>
      <Table.Cell>{getTime(created_at)}</Table.Cell>
      <Table.Cell>{getTime(updated_at)}</Table.Cell>
      <Table.Cell>
        {/* View Article */}
        <RedirectButton
          history={history}
          icon="eye"
          color="blue"
          path={{
            pathname: '/dashboard/article/' + id
          }}
        />
        {/* Update Article */}
        <RedirectButton
          history={history}
          icon="edit"
          color="green"
          path={`/dashboard/article/${id}/update`}
        />
        {
          post_state === true ?
          <Button
            icon="delete"
            size="mini"
            color="red"
            onClick={e => {
              clickDownButton(id)
            }}
          /> :
          <Button
            icon="hand pointer"
            size="mini"
            color="green"
          />
        }
      </Table.Cell>
    </Table.Row>
)

function mapDispatchToProps(dispacth) {
  return {
    clickDownButton: (id) => {
      dispacth(downArticle(dispacth, id))
    }
  }
}

const RouterWrapRow = withRouter(connect(null, mapDispatchToProps)(ArticleRow))
  
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