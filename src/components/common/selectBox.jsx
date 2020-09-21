import React from 'react';

const SelectBox = ({ name, label, value, options, onChange, error }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select value={value} name={name} id={name} onChange={onChange} className="form-control">
                {options.map(
                    option => {
                        return (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        )
                    }
                )}
            </select>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
}

export default SelectBox;