export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-secondary shadow-sm focus:ring-primary ' +
                className
            }
        />
    );
}
