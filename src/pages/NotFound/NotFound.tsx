import { Button, Flex, Image, Typography } from 'antd';
import type { FunctionComponent } from 'react';
import angryPikachu from '@/assets/angryPikachu.jpeg';
import styles from './notFound.module.scss';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/routes/routes';

const { Title } = Typography;

const NotFound: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Flex
      justify='center'
      align='center'
      vertical
      className={styles['not-found-container']}
    >
      <Title level={1}>404 - Page not found</Title>
      <Image
        src={angryPikachu}
        alt='Angry Pikachu not found'
        width={400}
        height={400}
        preview={false}
      />
      <Button
        size='large'
        variant='solid'
        type='primary'
        className={styles['home-button']}
        onClick={() => {
          navigate(routes.root)
        }}
      >
        Go Home
      </Button>
    </Flex>
  );
};

export default NotFound;
