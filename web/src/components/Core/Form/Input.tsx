import cn from 'classnames';

type Props = {
    id: string;
    label: string;
} & React.ComponentProps<'input'>;

export const Input: React.VFC<Props> = ({ id, label, className, ...rest }) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                {label}
            </label>
            <input
                type="text"
                id={id}
                className={cn(
                    'bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
                    className
                )}
                {...rest}
                placeholder={label}
                required
            ></input>
        </div>
    );
};
