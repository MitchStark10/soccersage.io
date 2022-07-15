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
        </>
    );
};

export default HomePage;
