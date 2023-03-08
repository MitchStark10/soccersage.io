import cn from 'classnames';

interface Props extends React.ComponentProps<'textarea'> {
    label?: string;
}

export const TextArea: React.FC<Props> = ({
    id,
    rows = 4,
    label,
    className,
    ...props
}) => {
    return (
        <>
            <label
                htmlFor={id}
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <textarea
                id={id}
                rows={rows}
                className={cn(
                    'block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                    className
                )}
                {...props}
            ></textarea>
        </>
    );
};
