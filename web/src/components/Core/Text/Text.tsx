import classNames from 'classnames';

type TextTypes = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface Props {
    variant?: TextTypes;
    As?: TextTypes;
    textAlign?: 'left' | 'center' | 'right';
    className?: string;
}

const STYLE_MAP = {
    p: 'text-base',
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base font-semibold m-4',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Ensures that text align classes are compiled into our CSS
const TEXT_ALIGN_CLASSES = 'text-left text-center text-right';

export const Text: React.FC<Props> = ({
    As = 'p',
    variant = As,
    textAlign = 'center',
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
