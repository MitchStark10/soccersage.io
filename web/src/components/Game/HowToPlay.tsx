import { Link, routes } from '@redwoodjs/router';

import { CounterContainer } from '../Core/Counter/CounterContainer';
import { ListItem } from '../Core/List/ListItem';
import { UnorderedList } from '../Core/List/UnorderedList';
import { Text } from '../Core/Text/Text';

export const HowToPlay = () => {
    return (
        <div className="-mx-5">
            <div className="px-4 py-10 lg:w-2/3 mx-auto">
                <CounterContainer
                    count={1}
                    title="Sign up for an account"
                    href="/sign-up"
                >
                    <Text>
                        Signing up for an account will enable your prediction
                        history to be saved, and will provide us with a way to
                        contact you if you are a season winner.
                    </Text>
                </CounterContainer>
                <CounterContainer count={2} title="Participate in a season">
                    <Text>
                        During the course of a season, you will be presented
                        with a fixed number of games to predict. All games that
                        will be included in the season will be available for
                        prediction on day one of the season. You will be able to
                        modify your prediction up until the kick-off of any game
                        that you&apos;ve predicted.
                    </Text>
                </CounterContainer>
                <CounterContainer count={3} title="Scoring System">
                    <Text>
                        <UnorderedList>
                            <ListItem>
                                3 points - You will receive 3 points when you
                                successfully predict any team to win.
                            </ListItem>
                            <ListItem>
                                2 points - You will receive 2 points when you
                                successfully predict a tie.
                            </ListItem>
                            <ListItem>
                                0 points - You will not receive any points for
                                any incorrect predictions.
                            </ListItem>
                        </UnorderedList>
                    </Text>
                </CounterContainer>
                <CounterContainer count={4} title="How to win">
                    <Text>
                        At the end of the season, the user with the highest
                        number of points will be declared the winner of that
                        season. You can view the{' '}
                        <Link
                            to={routes.standings()}
                            className="text-primary-dark underline font-bold"
                        >
                            live standings
                        </Link>{' '}
                        at any point during the season to see where you are at.
                    </Text>
                </CounterContainer>
                <CounterContainer count={4} title="Prize Money">
                    <Text>
                        At the beginning, prize money will be awarded to the top
                        three contestants. The prize money will be supplied by
                        soccersage.io (no buy-in required) as follows:
                        <UnorderedList className="my-2">
                            <ListItem>$50 - 1st Place</ListItem>
                            <ListItem>$30 - 2nd Place</ListItem>
                            <ListItem>$20 - 3rd Place</ListItem>
                        </UnorderedList>
                    </Text>
                    <Text>
                        Each winner will be contacted by soccersage.io over
                        email provide the prize money through Venmo. If we do
                        not receive a response within a week, the prize money
                        winners will shift by one. For example, if the 2nd place
                        user did not respond, then 3rd place would receive $30,
                        and 4th place would receive $20.
                    </Text>
                </CounterContainer>
            </div>
        </div>
    );
};
