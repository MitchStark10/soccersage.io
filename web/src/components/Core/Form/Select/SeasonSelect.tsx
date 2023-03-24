import { OptionData } from './Option';

import { Select } from '.';

export const SEASON_OPTIONS: OptionData[] = [
    {
        value: '1',
        label: 'Alpha Season',
    },
    {
        value: '2',
        label: 'Beta Season',
    },
];

interface Props {
    season: string;
    setSeason: (season: string) => void;
}

export const SeasonSelect: React.FC<Props> = ({ season, setSeason }) => {
    const currentSeasonTitle = SEASON_OPTIONS.find(
        (option) => option.value === season
    )?.label;

    return (
        <Select
            className="mb-2"
            title={currentSeasonTitle}
            value={season}
            setValue={setSeason}
            options={SEASON_OPTIONS}
        />
    );
};
