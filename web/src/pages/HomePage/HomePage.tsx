import builder, { BuilderComponent } from '@builder.io/react';
import { MetaTags } from '@redwoodjs/web';
import { useEffect, useState } from 'react';
import { BUILDER_PUBLIC_KEY } from 'src/constants';

builder.init(BUILDER_PUBLIC_KEY);

const HomePage = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        builder.get('page', { url: '/' }).toPromise().then(setContent);
    }, []);

    return (
        <>
            <MetaTags title="Home" description="Home page" />
            <BuilderComponent model="home-page" content={content} />
        </>
    );
};

export default HomePage;
