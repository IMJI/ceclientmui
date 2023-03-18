import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import DateFormater from '../utils/DateFormater';
import Status from '../models/Status';

export default function StatusesTimeline({ statuses }) {
    return (
        <Timeline
            sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
                },
            }}
        >
            {
                statuses.map((item, index) => {
                    const statusInfo = Status.getStatusInfo(item.status);
                    return (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent color="textSecondary">
                                {DateFormater.dateTimeToString(item.dateFrom)}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color={statusInfo.type}>
                                    {/* {Status.getStatusTypeIcon(statusInfo.type)} */}
                                </TimelineDot>
                                {statuses.length - 1 !== index ? <TimelineConnector /> : ''}
                            </TimelineSeparator>
                            <TimelineContent>{statusInfo.status}</TimelineContent>
                        </TimelineItem>
                    );
                })
            }
        </Timeline>
    );
}