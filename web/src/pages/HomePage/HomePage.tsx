import { MetaTags } from '@redwoodjs/web';

import { Text } from 'src/components/Core/Text/Text';
import { HowToPlay } from 'src/components/Game/HowToPlay';

const HomePage = () => {
    return (
        <div className="bg-background-gray p-5 -mx-5 -mb-5">
            <MetaTags
                title="Getting Started"
                description="Soccer Sage description"
            />
            <Text As="h1" textAlign="center" className="mt-0">
                Pre-season Begins!
            </Text>
            <div className="grid grid-cols-3 md:grid-cols-6 my-4 p-4 justify-items-center items-center gap-y-4 -mx-5">
                <img
                    className="w-20"
                    src="/logos/leagues/premier-league-logo.png"
                    alt="Premier League Logo"
                    width={80}
                    height={80}
                />
                <img
                    src="/logos/leagues/la-liga-logo.png"
                    alt="La Liga Logo"
                    width={175}
                    height={98}
                />
                <img
                    src="/logos/leagues/bundesliga-logo.png"
                    alt="Bundesliga Logo"
                    className="w-20"
                    width={80}
                    height={80}
                />
                <img
                    src="/logos/leagues/serie-a-logo.png"
                    alt="Serie A Logo"
                    width={200}
                    height={112}
                />
                <img
                    src="/logos/leagues/ligue-1-logo.png"
                    alt="Ligue 1 Logo"
                    className="w-16"
                    width={150}
                    height={75}
                />
                <img
                    src="/logos/leagues/mls-logo.svg"
                    alt="MLS Logo"
                    className="w-24"
                    width={80}
                    height={80}
                />
            </div>
            <HowToPlay />
        </div>
    );
};

export default HomePage;
