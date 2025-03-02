export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out shadow-md hover:bg-white hover:text-primary focus:bg-white hover:border-primary focus:border-primary focus:text-primary focus:outline-none ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
