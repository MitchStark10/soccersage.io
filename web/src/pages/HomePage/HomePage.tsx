import { MetaTags } from '@redwoodjs/web';
import { H1 } from 'src/components/Core/Text/H1';
import { Text } from 'src/components/Core/Text/Text';

const HomePage = () => {
    return (
        <div>
            <MetaTags
                title="soccersage.io"
                description="Soccer Sage description"
            />
            <H1>Show off your soccer knowledge</H1>
            <Text className="text-center sm:w-[40vw] mx-auto">
                Track your predictions across different leagues. Over the course
                of a month, you will accumulate points and get to compete
                against other soccer experts.
            </Text>
            <div className="grid grid-cols-3 md:grid-cols-6 border rounded mt-4 p-4 justify-items-center items-center gap-y-4">
                <img
                    className="w-20"
                    src="/logos/leagues/premier-league-logo.png"
                    alt="Premier League Logo"
                />
                <img src="/logos/leagues/la-liga-logo.png" alt="La Liga Logo" />
                <img
                    src="/logos/leagues/bundesliga-logo.png"
                    alt="Bundesliga Logo"
                    className="w-20"
                />
                <img src="/logos/leagues/serie-a-logo.png" alt="Serie A Logo" />
                <img
                    src="/logos/leagues/ligue-1-logo.png"
                    alt="Ligue 1 Logo"
                    className="w-20"
                />
                <img
                    src="/logos/leagues/mls-logo.svg"
                    alt="MLS Logo"
                    className="w-24"
                />
            </div>
        </div>
    );
};

export default HomePage;
