import { Autocomplete } from "@heroui/react";

const SearchIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={height || size}
            role="presentation"
            viewBox="0 0 24 24"
            width={width || size}
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

export default function AutoCompleteSelect({ title, children ,...props}) {
    return (
        <Autocomplete
            {...props}
            aria-label={`Select ${title}`}
            classNames={{
                base: "max-w-lg",
                listboxWrapper: "max-h-[320px]",
                selectorButton: "text-default-500",
            }}
            inputProps={{
                classNames: {
                    input: "ml-1 !border-none focus:ring-0 focus:outline-none focus:border-none",
                    inputWrapper: "h-[48px]",
                },
            }}
            listboxProps={{
                hideSelectedIcon: true,
                itemClasses: {
                    base: [
                        "rounded-medium",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[hover=true]:bg-default-200",
                        "data-[selectable=true]:focus:bg-default-100",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                },
            }}
            placeholder={`Enter ${title}`}
            popoverProps={{
                offset: 10,
                classNames: {
                    base: "rounded-large",
                    content: "p-1 border-small border-default-100 bg-background",
                },
            }}
            // radius="full"
            variant="bordered"
            startContent={<SearchIcon className="text-default-400" size={20} strokeWidth={2.5} />}
        >

            { children }
            {/* <AutocompleteItem
                key="argentina"
                startContent={
                    <Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />
                }
            >
                Argentina
            </AutocompleteItem> */}

        </Autocomplete>
    );
}
