import builder, { BuilderComponent } from '@builder.io/react';
import { MetaTags } from '@redwoodjs/web';
import { useEffect, useState } from 'react';
import { BUILDER_PUBLIC_KEY } from 'src/constants';

builder.init(BUILDER_PUBLIC_KEY);

const HomePage = () => {
    const [content, setContent] = useState(undefined);

    useEffect(() => {
        builder.get('page', { url: '/' }).toPromise().then(setContent);
    }, []);

    console.log('content', content);
    return (
        <>
            <MetaTags title="Home" description="Home page" />
            {content ? (
                <BuilderComponent model="home-page" content={content} />
            ) : null}
        </>
    );
};

export default HomePage;
