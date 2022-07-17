import builder, { BuilderComponent } from '@builder.io/react';
import { MetaTags } from '@redwoodjs/web';
import { useEffect, useState } from 'react';

// TODO: Replace this builder key
builder.init('');

const HomePage = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        builder.get('home-page', { url: '/' }).toPromise().then(setContent);
    }, []);

    return (
        <>
            <MetaTags title="Home" description="Home page" />
            <BuilderComponent model="home-page" content={content} />
        </>
    );
};

export default HomePage;
