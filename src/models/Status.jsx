import { Chip } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from "@mui/icons-material/Check";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const statusTranslations = {
    'Created': 'Создан',
    'In process': 'В обработке',
    'Stocking': 'Сборка',
    'Shipping': 'Доставка',
    'Shipped': 'Доставлен',
    'Canceled': 'Отменен'
}

class Status {
    static getStatusInfo(status) {
        let type;
        if (status === 'Shipped')
            type = 'success';
        else if (status === 'Canceled')
            type = 'error'
        else
            type = 'primary'
        return { status: statusTranslations[status], type }
    }

    static getStatusChip(status) {
        const s = this.getStatusInfo(status);
        return (
            <Chip
                label={s.status}
                size="small"
                color={s.type}
                icon={this.getStatusTypeIcon(s.type)}
            />
        );
    }

    static getStatusTypeIcon(type) {
        if (type === 'success')
            return <CheckIcon />
        else if (type === 'error')
            return <CancelIcon />
        else
            return <HourglassBottomIcon />
    }
}

export default Status;