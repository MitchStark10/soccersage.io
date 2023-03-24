import React, { createRef, useState } from 'react';

import { createPopper } from '@popperjs/core';
import classNames from 'classnames';

import { ChevronDown } from 'src/components/Icons/ChevronDown';
import { ChevronUp } from 'src/components/Icons/ChevronUp';

import { Option, OptionData } from './Option';

export interface SelectProps {
    title: string;
    value: string;
    options: OptionData[];
    setValue: (value: string) => void;
    className?: string;
}

export const Select: React.FC<SelectProps> = ({
    title,
    options,
    value,
    setValue,
    className,
}) => {
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const btnDropdownRef = createRef<HTMLButtonElement>();
    const popoverDropdownRef = createRef<HTMLDivElement>();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: 'bottom-start',
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };
    return (
        <>
            <div className={classNames('flex flex-wrap', className)}>
                <div>
                    <div className="relative inline-flex align-middle w-full">
                        <button
                            className={
                                'bg-white text-slate-700 font-bold uppercase text-sm px-6 py-3 rounded shadow betterhover:hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex gap-2 items-center'
                            }
                            type="button"
                            ref={btnDropdownRef}
                            onClick={() => {
                                dropdownPopoverShow
                                    ? closeDropdownPopover()
                                    : openDropdownPopover();
                            }}
                        >
                            {title}
                            {dropdownPopoverShow ? (
                                <ChevronUp />
                            ) : (
                                <ChevronDown />
                            )}
                        </button>
                        <div
                            ref={popoverDropdownRef}
                            className={
                                (dropdownPopoverShow ? 'block ' : 'hidden ') +
                                'bg-light-gray text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1'
                            }
                            style={{ minWidth: '12rem' }}
                        >
                            {options.map((option) => (
                                <Option
                                    key={option.value}
                                    {...option}
                                    setValue={setValue}
                                    currentValue={value}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
