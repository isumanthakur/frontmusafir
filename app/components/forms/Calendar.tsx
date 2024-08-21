'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
    value: Range,
    onChange: (value: RangeKeyDict) => void;
    bookedDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    bookedDates
}) => {
    return (
        <div className="w-full md:w-auto flex justify-center">
            <DateRange
                className="shadow-xl rounded-xl mb-4"
                rangeColors={['#262626']}
                ranges={[value]}
                date={new Date()}
                onChange={onChange}
                direction="horizontal"  // Use horizontal on larger screens
                showDateDisplay={false}
                minDate={new Date()}
                disabledDates={bookedDates}
            />
        </div>
    )
}

export default DatePicker;
