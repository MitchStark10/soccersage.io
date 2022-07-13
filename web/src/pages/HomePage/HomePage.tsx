import { MetaTags } from '@redwoodjs/web';
import { Contentful } from 'src/components/Core/Contentful/Contentful';
import { useContentful } from 'src/hooks/use-contentful';
import { HOME_PAGE_ENTRY_ID } from 'src/web-constants';

const HomePage = () => {
    const homePageContent = useContentful(HOME_PAGE_ENTRY_ID);
    return (
        <>
            <MetaTags title="Home" description="Home page" />
            <Contentful node={homePageContent?.fields.mainContent} />
            <br />
            <hr />
            <h1>This will be removed prior to merge</h1>
            {JSON.stringify(homePageContent)}
        </>
    );
};

export default HomePage;
