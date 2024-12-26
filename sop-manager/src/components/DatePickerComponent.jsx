import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// eslint-disable-next-line react/prop-types
const DatePickerComponent = ({ date, setDate }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
            />
        </LocalizationProvider>
    );
};

export default DatePickerComponent;
