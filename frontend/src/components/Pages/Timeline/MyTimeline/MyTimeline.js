import Timeline from "@mui/lab/Timeline";
import {TimelineOppositeContent, timelineOppositeContentClasses} from "@mui/lab";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Typography from "@mui/material/Typography";
import {useEffect, useRef, useState} from "react";
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import TerminalIcon from '@mui/icons-material/Terminal';
import HandymanIcon from '@mui/icons-material/Handyman';
import GavelIcon from '@mui/icons-material/Gavel';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BackpackIcon from '@mui/icons-material/Backpack';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import PianoIcon from '@mui/icons-material/Piano';
import BalanceIcon from '@mui/icons-material/Balance';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import {blue, green, red} from '@mui/material/colors';
import {Chip} from "@mui/material";
import Stack from "@mui/material/Stack";
import BiotechIcon from '@mui/icons-material/Biotech';
import FunctionsIcon from '@mui/icons-material/Functions';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import StorageIcon from '@mui/icons-material/Storage';
import ReactMarkdown from "react-markdown";
import DataObjectIcon from '@mui/icons-material/DataObject';
import ScienceIcon from '@mui/icons-material/Science';
import ComputerIcon from '@mui/icons-material/Computer';
import MemoryIcon from '@mui/icons-material/Memory';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import AssistantIcon from '@mui/icons-material/Assistant';
import Box from "@mui/material/Box";


const icons = {
    assistant: <AssistantIcon/>,
    flow: <AccountTreeIcon/>,
    memory: <MemoryIcon/>,
    computer: <ComputerIcon />,
    science: <ScienceIcon />,
    dataObject: <DataObjectIcon />,
    storage: <StorageIcon />,
    discrete: <FunctionsIcon />,
    biotech: <BiotechIcon />,
    greenEnergy: <EnergySavingsLeafIcon />,
    electric: <ElectricBoltIcon />,
    balance: <BalanceIcon />,
    piano: <PianoIcon />,
    repair: <HomeRepairServiceIcon />,
    backpack: <BackpackIcon />,
    work: <WorkIcon />,
    school: <SchoolIcon />,
    game: <SportsEsportsIcon />,
    fastfood: <FastfoodIcon />,
    handyman: <HandymanIcon />,
    terminal: <TerminalIcon />,
    gavel: <GavelIcon />,
};

const categoryIcons = {
  professional: icons.work,
  academic: icons.school,
  personal: icons.game,
};

const filters = {
    all: 'all',
    professional: 'professional',
    academic: 'academic',
    personal: 'personal',
};

const timelineTheme = createTheme({
    typography: {
        fontFamily: 'monospace',
        fontSize: 14,
    },
    palette: {
        professional: {
            main: blue[600],
            contrastText: "#fff",
        },
        academic: {
            main: red[600],
            contrastText: "#fff",
        },
        personal: {
            main: green[600],
            contrastText: "#fff",
        },
    }

});

export default function MyTimeline(props) {
    const bottomRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [sortAsc, setSortAsc] = useState(false);
    const sortedMessages = sortAsc ? messages.slice().reverse() : messages;
    const [filter, setFilter] = useState('all');

    const handleFilterClick = (category) => {
        setFilter(category);
    };
    const [hasScrollbar, setHasScrollbar] = useState(false);
    const timelineRef = useRef(null);


    useEffect(() => {
        const checkScrollbar = () => {
            setHasScrollbar(
                document.documentElement.scrollHeight > document.documentElement.clientHeight
            );
        };
        checkScrollbar();
        window.addEventListener("resize", checkScrollbar);
        return () => window.removeEventListener("resize", checkScrollbar);
    }, [[], filter]);

    useEffect(() => {
        fetch('/static/my_timeline.json')
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <ThemeProvider theme={timelineTheme}>
            <Stack direction="row" spacing={1} justifyContent="center">
                {Object.keys(filters).map((key) => (
                    <Chip
                        key={key}
                        variant={filter === key ? 'filled' : 'outlined'}
                        color={key !== 'all' ? key : undefined}
                        icon={key !== 'all' ? icons[key === 'professional' ? 'work' : key === 'academic' ? 'school' : 'terminal'] : undefined}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        onClick={() => handleFilterClick(key)}
                        size={'medium'}
                    />
                ))}
                <Chip
                    icon={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SortIcon/>
                            {sortAsc ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>}
                        </Box>
                    }
                    label={'Toggle Sort'}
                    onClick={() => setSortAsc(!sortAsc)}
                />
            </Stack>
            <Timeline
                ref={timelineRef}
                sx={{
                    [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.2,
                    },
                }}>

                {
                    sortedMessages.map((item, index) =>
                        item.category === filter | filter === 'all' ? (
                            <TimelineItem key={index}>
                                <TimelineOppositeContent color="text.secondary">
                                    {item.date}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot color={item.category}>
                                        {icons[item.icon] || categoryIcons[item.category]}
                                    </TimelineDot>
                                    {index < messages.length - 1 && <TimelineConnector/>}
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Typography fontWeight={'bold'}>
                                        {item.event}
                                    </Typography>
                                    <Typography align={'justify'}>
                                        <ReactMarkdown
                                            components={{

                                                p: ({node, ...props}) => (
                                                    <Typography variant="body1" sx={{margin: 0}} {...props} />
                                                ),
                                            }}>
                                            {item.description}
                                        </ReactMarkdown>
                                    </Typography>
                                </TimelineContent>
                            </TimelineItem>
                        ) : null
                    )

                }
            </Timeline>
            {hasScrollbar ?
                <Chip
                    label={'GO TO TOP'}
                    ref={bottomRef}
                    onClick={() => props.topRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                    GO TO TOP
                </Chip>
                :
                null
            }

        </ThemeProvider>
    );
}