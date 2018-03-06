import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ActionCard = ({ title, icon, description, buttonText, href}) => {
  return (
    <Card as={Link} to={href}>
      <Card.Content
        header={title}
        textAlign="center"
      />
      <Card.Content textAlign="center">
        <p>
          <Icon
            name={icon}
            color="grey"
            size="huge"
          />
        </p>
        <p className="card-grey-text">{description}</p>
        <p><Button positive>{buttonText}</Button></p>
      </Card.Content>
    </Card>
  )
}

ActionCard.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string.isRequired
}

export default ActionCard