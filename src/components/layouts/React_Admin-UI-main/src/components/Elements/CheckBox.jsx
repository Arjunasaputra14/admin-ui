import React from 'react';

function CheckBox(props) {
    const { label, id, ...rest } = props;
    return (
        <>
            <input
                className="h-4 w-4 accent-primary"
                id={id}
                {...rest}
              />
              <label htmlFor="status" className="text-sm text-gray-600 ml-2">
                {label}
              </label>
        </>
    );
}

export default CheckBox;