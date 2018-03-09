import React from 'react';
import { Card } from 'semantic-ui-react';
import ActionCard from '../../../components/ActionCard'

const Dashboard = () => (
  <Card.Group>
      <ActionCard
        href="/dashboard/post"
        title="发布文章"
        icon="edit"
        description="发布您的文章，所见即所得"
        buttonText="写文章"
        />
      <ActionCard
        href="/dashboard/media"
        title="管理媒体"
        icon="picture"
        description="管理上传的照片"
        buttonText="管理媒体"
        />
  </Card.Group>
)

export default Dashboard;