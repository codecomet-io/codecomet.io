import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Homepage from '@site/src/components/Homepage';

import styles from './index.module.css';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={`👋 ${siteConfig.title}`}
      description="Next Generation CI">
      <Homepage />
    </Layout>
  );
}
