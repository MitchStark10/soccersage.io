import { CounterContainer } from '../Core/Counter/CounterContainer';
import { ListItem } from '../Core/List/ListItem';
import { UnorderedList } from '../Core/List/UnorderedList';
import { Text } from '../Core/Text/Text';

export const HowToPlay = () => {
    return (
        <div className="-mx-5">
            <div className="px-4 py-10 lg:w-2/3 mx-auto">
                <CounterContainer count={1} title="Sign up for an account">
                    <Text>
                        Signing up for an account will enable your prediction
                        history to be saved, and will provide us with a way to
                        contact you if you are a season winner.
                    </Text>
                </CounterContainer>
                <CounterContainer
                    count={2}
                    title="View the upcoming games, and make your predictions"
                >
                    <Text>
                        TODO: Update this to link to the rules page Seasons in
                        soccersage.io last for one calendar-based month. For
                        example, a season may last from September 1 - September
                        30.
                    </Text>
                </CounterContainer>
                <CounterContainer count={3} title="Track your predictions">
                    <Text As="div" variant="p">
                        soccersage.io provides you with the ability to track
                        each prediction that you&apos;ve made for the current
                        season.
                        <UnorderedList>
                            <ListItem>
                                If you correctly predict the winning team, you
                                wil be awared 2 points for that prediction.{' '}
                            </ListItem>
                            <ListItem>
                                If you correctly predict a tie, you will be
                                awared a a single point for that prediction.
                            </ListItem>
                            <ListItem>
                                If you do not predict the game&apos;s outcome
                                correctly, you will not be awarded any points.
                            </ListItem>
                        </UnorderedList>
                    </Text>
                </CounterContainer>
                <CounterContainer count={4} title="Win prizes">
                    <Text>
                        You&apos;ll be able to track each of your predictions,
                        as well as have the ability to track how your
                        predictions compare to your competitors. If you manage
                        to place 1st for a given month, we will reach out to you
                        for your prize money for that given season!
                    </Text>
                </CounterContainer>
            </div>
        </div>
    );
};
