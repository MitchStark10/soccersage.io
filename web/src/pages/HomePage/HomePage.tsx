import { MetaTags } from '@redwoodjs/web';

import { CounterContainer } from 'src/components/Core/Counter/CounterContainer';
import { Text } from 'src/components/Core/Text/Text';

const HomePage = () => {
    return (
        <div className="bg-background-gray p-5 -mx-5 -mb-5">
            <MetaTags
                title="Getting Started"
                description="Soccer Sage description"
            />
            <Text As="h1" className="mt-0">
                Pre-season Begins!
            </Text>
            <div className="grid grid-cols-3 md:grid-cols-6 mt-4 p-4 justify-items-center items-center gap-y-4 -mx-5">
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
                    width={243}
                    height={137}
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
                    width={243}
                    height={137}
                />
                <img
                    src="/logos/leagues/ligue-1-logo.png"
                    alt="Ligue 1 Logo"
                    className="w-20"
                />
                <img
                    src="/logos/leagues/mls-logo.svg"
                    alt="MLS Logo"
                    className="w-24"
                    width={80}
                    height={80}
                />
            </div>
            {/* TODO: There should only be 1 h1 on the page */}
            <div className="bg-white -mx-5">
                <div className="px-4 py-10 lg:w-2/3 mx-auto">
                    <CounterContainer count={1} title="Sign up for an account">
                        <Text>
                            Signing up for an account will enable your
                            prediction history to be saved, and will provide us
                            with a way to contact you if you are a season
                            winner.
                        </Text>
                    </CounterContainer>
                    <CounterContainer
                        count={2}
                        title="View the upcoming games, and make your predictions"
                    >
                        <Text>
                            Seasons in soccersage.io last for one calendar-based
                            month. For example, a season may last from September
                            1 - September 30.
                        </Text>
                    </CounterContainer>
                    <CounterContainer count={3} title="Track your predictions">
                        <Text>
                            soccersage.io provides you with the ability to track
                            each prediction that you&apos;ve made for the
                            current season.
                            <ul className="list-disc ml-8">
                                <li>
                                    If you correctly predict the winning team,
                                    you wil be awared 2 points for that
                                    prediction.{' '}
                                </li>
                                <li>
                                    If you correctly predict a tie, you will be
                                    awared a a single point for that prediction.
                                </li>
                                <li>
                                    If you do not predict the game&apos;s
                                    outcome correctly, you will not be awarded
                                    any points.
                                </li>
                            </ul>
                        </Text>
                    </CounterContainer>
                    <CounterContainer count={4} title="Win prizes">
                        <Text>
                            You&apos;ll be able to track each of your
                            predictions, as well as have the ability to track
                            how your predictions compare to your competitors. If
                            you manage to place 1st for a given month, we will
                            reach out to you for your prize money for that given
                            season!
                        </Text>
                    </CounterContainer>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
