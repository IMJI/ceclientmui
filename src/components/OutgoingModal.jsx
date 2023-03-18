import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/material';
import useFetching from '../hooks/useFetching';
import { CircularProgress } from '@mui/material';
import OutgoingService from '../services/OutgoingService';
import StatusesTimeline from './StatusesTimeline';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function OutgoingModal({ id, open, setOpen }) {
    const handleClose = () => {
      	setOpen(false);
    };

    const [outgoing, setOutgoing] = React.useState(null);

    const [fetchOutgoing, isOutgoingLoading, errorOutgoing] = useFetching(async () => {
        if (id) {
            const outgoing = await OutgoingService.get(id);
            setOutgoing(outgoing);
            console.log('fetch')
            console.log(outgoing)
        }
    });

    React.useEffect(() => {
        fetchOutgoing();
    }, [open]);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{ sx: { width: '100%', maxWidth: '800px' } }}
        >
            <DialogTitle>{`Информация о продаже №${id}`}</DialogTitle>
            {
                isOutgoingLoading || errorOutgoing || (!outgoing)
                ? (
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <CircularProgress color="inherit" />
                    </Box>
                )
                : (
                    <DialogContent>
                        <StatusesTimeline statuses={outgoing.statuses} />
                    </DialogContent>
                )
            }
            <DialogActions>
                <Button onClick={handleClose}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
}