import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
  <>
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>

      <div className="diagonal-box py-16 bg-gray-200 overflow-hidden">
          <div className="diagonal-content max-w-xl mx-auto px-4 md:px-6 lg:px-8 lg:max-w-screen-xl">
              <div className="max-w-screen-xl mx-auto pt-6 px-4 md:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto text-center">
                      <h2 className="text-3xl leading-9 font-extrabold text-gray-900 md:text-4xl md:leading-10">
                          How it works
                      </h2>
                      <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
                          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                          dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                      </p>
                  </div>
              </div>

              <div className="py-16">
                  <div className="max-w-xl mx-auto px-4 md:px-6 lg:max-w-screen-lg lg:px-8 ">
                      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                          <div>
                              <div className="flex items-center justify-center">
                                  <img
                                      className="h-200"
                                      src='img/scraping.svg'
                                      width="190px"
                                      height="220px"
                                      alt="Scraping with Algolia Crawler"
                                  />
                              </div>
                              <div className="mt-10 lg:mt-0 p-4">
                                  <h5 className="text-lg leading-6 font-medium text-gray-900">
                                      1. Scraping
                                  </h5>
                                  <p className="mt-2 text-base leading-6 text-gray-600">
                                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                                  </p>
                              </div>
                          </div>
                          <div className="mt-10 lg:mt-0 p-4">
                              <div className="h-200 flex items-center justify-center">
                                  <img
                                      src="img/configuration.svg"
                                      width="140px"
                                      height="220px"
                                      alt="Configuration of your crawler"
                                  />
                              </div>
                              <div>
                                  <h5 className="text-lg leading-6 font-medium text-gray-900">
                                      2. Configuration
                                  </h5>
                                  <p className="mt-2 text-base leading-6 text-gray-600">
                                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                                  </p>
                              </div>
                          </div>
                          <div className="mt-10 lg:mt-0 p-4">
                              <div className="h-200 flex items-center justify-center">
                                  <img
                                      src="img/implementation.svg"
                                      width="220px"
                                      height="220px"
                                      alt="Implementation on your website"
                                  />
                              </div>
                              <div>
                                  <h5 className="text-lg leading-6 font-medium text-gray-900">
                                      3. Implementation
                                  </h5>
                                  <p className="mt-2 text-base leading-6 text-gray-600">
                                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </>
  );
}

export default function Homepage(){
    const {siteConfig} = useDocusaurusContext();
    return (
        <>
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            className="button button--secondary button--lg"
                            to="/docs/intro">
                            Docusaurus Tutorial - 5min ⏱️
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                <HomepageFeatures />
            </main>
        </>
    );
}
