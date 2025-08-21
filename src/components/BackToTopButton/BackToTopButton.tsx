import { Button } from 'antd';
import { useEffect, useState, type FunctionComponent } from 'react';
import type { BackToTopButtonProps } from './types';
import { UpOutlined } from '@ant-design/icons';
import styles from './backToTopButton.module.scss';

const BackToTopButton: FunctionComponent<BackToTopButtonProps> = ({
  threshold = 300,
}) => {
  const [displayButton, setDisplay] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setDisplay(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    displayButton && (
      <Button
        shape='circle'
        className={styles['back-to-top-button']}
        icon={<UpOutlined className={styles.arrow} />}
        size='large'
        type="primary"
        onClick={scrollToTop}
      />
    )
  );
};

export default BackToTopButton;
