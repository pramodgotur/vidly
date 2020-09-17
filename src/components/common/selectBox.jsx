import React from 'react';

const SelectBox = ({ name, label, options }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} className="form-control">
                <option value="">Select {label}</option>
                {options.map(
                    option => {
                        return (
                            <option value={option.value}>{option.label}</option>
                        )
                    }
                )}
            </select>
        </div>
    );
}

export default SelectBox;