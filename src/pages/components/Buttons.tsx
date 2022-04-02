type ButtonType = 'primary' | 'secondary';

export function Button(type: ButtonType = "primary", label: string, custom_id?: string) {
    if (!custom_id) {
        custom_id = label.replace(/\s/g, '-').toLowerCase();
    }

    return (
        <button type="button" id={custom_id} className={`btn btn-${type}`}>
            {label}
        </button>
    );
}