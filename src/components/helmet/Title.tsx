import React from 'react';
import { Helmet } from 'react-helmet-async';

type TitlePropsType = {
  title: string;
  content: string;
};

const Title: React.FC<TitlePropsType> = ({ title, content }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={content}></meta>
      </Helmet>
    </div>
  );
};

export default Title;
