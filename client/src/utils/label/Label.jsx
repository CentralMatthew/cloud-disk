import React from 'react';

const Label = ({value}) => {
    return (
        <div>
            <label className="block mb-1 font-bold text-gray-500">{value}</label>
        </div>
    );
};

export default Label;
