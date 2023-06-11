import { Link, routes } from '@redwoodjs/router';

import { ListItem } from '../Core/List/ListItem';
import { UnorderedList } from '../Core/List/UnorderedList';
import { Text } from '../Core/Text/Text';

export const Rules = () => {
    return (
        <>
            <Text variant="h1" textAlign="center">
                Rules
            </Text>
            <Text variant="h3">Seasons</Text>
            <UnorderedList>
                <ListItem>
                    Seasons in soccersage.io last for one calendar-based month.
                    For example, a season may last from September 1 - September
                    30.
                </ListItem>
                <ListItem>
                    During the course of a season, you will be presented with a
                    fixed number of games to predict. All games that will be
                    included in the season will be available for prediction on
                    day one of the season. You will be able to modify your
                    prediction up until the kick-off of any game that
                    you&apos;ve predicted.
                </ListItem>
            </UnorderedList>
            <Text variant="h3">Scoring System</Text>
            <UnorderedList>
                <ListItem>
                    1 point - You will receive 1 point when you successfully
                    predict the outcome of any match.
                </ListItem>
                <ListItem>
                    0 points - You will not receive any points for any incorrect
                    predictions.
                </ListItem>
            </UnorderedList>
            <Text variant="h3">How to win</Text>
            <UnorderedList>
                <ListItem>
                    At the end of the season, the user with the highest number
                    of points will be declared the winner of that season. You
                    can view the{' '}
                    <Link to={routes.standings()}>live standings</Link> at any
                    point during the season to see where you are at.
                </ListItem>
            </UnorderedList>
            <Text variant="h3">Prize Money</Text>
            <UnorderedList>
                <ListItem>
                    At the beginning, prize money will be awarded to the top
                    three contestants. The prize money will be supplied by
                    soccersage.io (no buy-in required) as follows:
                    <UnorderedList>
                        <ListItem>$50 - 1st Place</ListItem>
                        <ListItem>$30 - 2nd Place</ListItem>
                        <ListItem>$20 - 3rd Place</ListItem>
                    </UnorderedList>
                </ListItem>
                <ListItem>
                    Each winner will be contacted by soccersage.io over email
                    provide the prize money through Venmo. If we do not receive
                    a response within a week, the prize money winners will shift
                    by one. For example, if the 2nd place user did not respond,
                    then 3rd place would receive $30, and 4th place would
                    receive $20.
                </ListItem>
            </UnorderedList>
            <Text variant="h3">Future Plans</Text>
            <Text>
                The long-term goal is for soccersage.io to be a self-sustaining
                community. Once there is a substantial user-base, the plan is to
                create a $5 buy-in cost per season that will be used to fund the
                prize money. This means that a larger user base will result in a
                larger prize pool for the players! Any user who would like to
                play for free will continue to have access to do so, but will
                not be eligilbe to win the final prize money.
            </Text>
        </>
    );
};
