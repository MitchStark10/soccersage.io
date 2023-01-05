import classNames from 'classnames';
import { Alignment } from 'types/alignment';

type TextTypes = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'caption';

interface Props {
    variant?: TextTypes | 'caption';
    As?: TextTypes;
    textAlign?: Alignment;
    className?: string;
}

const STYLE_MAP = {
    p: 'text-base',
    h1: 'text-4xl py-8 font-extrabold',
    h2: 'text-3xl py-6 font-extrabold',
    h3: 'text-2xl py-6 font-bold',
    h4: 'text-xl py-4',
    h5: 'text-lg py-4',
    h6: 'text-base font-semibold py-4',
    caption: 'text-sm py-2',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Ensures that text align classes are compiled into our CSS
const TEXT_ALIGN_CLASSES = 'text-left text-center text-right';

export const Text: React.FC<Props> = ({
    As = 'p',
    variant = As,
    textAlign = 'left',
    className,
    children,
}) => {
    return (
        <As
            className={classNames(
                className,
                STYLE_MAP[variant],
                `text-${textAlign}`
            )}
        >
            {children}
        </As>
    );
};
