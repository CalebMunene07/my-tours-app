import React from 'react';
import { Select } from 'antd';

const BookingForm = () => {
    return (
        <div>
            <Select
                style={{ maxHeight: '400px', color: '#1a1a1a', fontSize: '13px' }}
                dropdownStyle={{ maxHeight: '400px' }}
                // Removed category filtering to display all international tours
            >
                {/* Tours mapping logic below would need to account for all tours here */}
            </Select>
        </div>
    );
};

export default BookingForm;