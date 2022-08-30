import { MetaTags } from '@redwoodjs/web';
import { H1 } from 'src/components/Core/Text/H1';

const HomePage = () => {
    return (
        <div className="bg-light-gray">
            <MetaTags
                title="soccersage.io"
                description="Soccer Sage description"
            />
            <H1>Show off your soccer knowledge</H1>
        </div>
    );
};

export default HomePage;
