import React, {useEffect, useRef, useState} from 'react';
import { AnimatePresence } from 'framer-motion';
import NavBar from "./components/NavBar/NavBar.js";
import Box from "@mui/material/Box";
import {Route, Routes} from "react-router";
import Homepage from "./components/Pages/Homepage/Homepage";
import Timeline from "./components/Pages/Timeline/Timeline";
import Showdown from "./components/Pages/Showdown/Showdown";
import FAQ from "./components/Pages/FAQ/FAQ";
import ChatBox from "./components/ChatBox/ChatBox";
import Cyforge from "./components/Pages/Cyforge/Cyforge";
import Radio from "./components/Pages/Radio/Radio.js";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import MusicPlayerIcon from "./components/MusicPlayerIcon/MusicPlayerIcon";
import ChatBoxIcon from "./components/ChatBoxIcon/ChatBoxIcon";
import NewVisitorModal from "./components/NewVisitorModal/NewVisitorModal";
import CookieModal from "./components/CookieModal/CookieModal";
import Virgil from "./components/Pages/Virgil/Virgil";
import { HighlightProvider } from './contexts/HighlightContext';
import Ai_in_law from "./components/Pages/Articles/ai_in_law";
import Website_licensing from "./components/Pages/Articles/website_licensing";

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const setCookie = (name, value, days = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const generateUniqueId = () => {
    return 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

function App() {

    const topRef = useRef(null);
    const [message, setMessage] = useState('');
    const [showAudioBox, setShowAudioBox] = useState(false);
    const [showMusicPlayer, setShowMusicPlayer] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [startingTrack, setStartingTrack] = useState(0);
    const [cookieModalOpen, setCookieModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [chatVisible, setChatVisible] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const chatMessageHandlerRef = useRef(null);

    // Initialize or retrieve user ID from cookies
    useEffect(() => {
        let storedUserId = getCookie('userId');
        if (!storedUserId) {
            storedUserId = generateUniqueId();
            setCookie('userId', storedUserId);
        }
        setUserId(storedUserId);
    }, []);

    const handlePlaylistSelect = (playlist, trackIndex = 0) => {
        setCurrentPlaylist(playlist);
        setStartingTrack(trackIndex);
    };

    const handleShowMusicPlayer = () => {
        setShowMusicPlayer(true);
    };

    const handleChatIconClick = () => {
        setChatVisible(!chatVisible);
    };

    const handleSendMessage = (message) => {
        setChatMessages([...chatMessages, {id: Date.now(), text: message, sender: 'user'}]);
        // Here you would also send the message to the backend or wherever it's supposed to go
    };

    useEffect(() => {
        fetch('/healthcheck')
          .then(response => response.json())
          .then(data => setMessage(data.message))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    const handleExternalChatMessage = (message) => {
        setChatVisible(true);
        if (chatMessageHandlerRef.current) {
            chatMessageHandlerRef.current(message);
        }
    };

    const registerChatMessageHandler = (handler) => {
        chatMessageHandlerRef.current = handler;
    };

    return (
        <ThemeProvider theme={theme}>
            <HighlightProvider>
                <Box className="App"
                     sx={{
                         bgcolor: '#ffffff',
                         minWidth: '100%',
                         minHeight: '100%',
                     }}
                >
                    <NewVisitorModal/>
                    <CookieModal open={cookieModalOpen} onClose={() => setCookieModalOpen(false)} />

                    <div ref={topRef}/>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Homepage onSendChatMessage={handleExternalChatMessage} />}/>
                        <Route path="/timeline" element={<Timeline topRef={topRef}/>}/>
                        <Route path="/cyforge" element={<Cyforge/>}/>
                        <Route path="/radio" element={
                            <Radio
                                showMusicPlayer={showMusicPlayer}
                                onShowMusicPlayer={handleShowMusicPlayer}
                                onPlaylistSelect={handlePlaylistSelect}
                            />
                        }/>
                        <Route path="/showdown" element={<Showdown/>}/>
                        <Route path="/faq" element={<FAQ/>}/>
                        <Route path="/virgil" element={<Virgil/>}/>
                        <Route path="/articles/ai_in_law" element={<Ai_in_law/>}/>
                        <Route path="/articles/website_licensing" element={<Website_licensing/>}/>
                    </Routes>

                    <ChatBox
                        onRegisterMessageHandler={registerChatMessageHandler}
                        visible={chatVisible}
                        onVisibilityChange={setChatVisible}
                        messages={chatMessages}
                        onSendMessage={handleSendMessage}
                    />

                    ChatBoxIcon
                        onClick={handleChatIconClick}
                        isChatOpen={chatVisible}
                        hasNewMessages={false}
                        messageCount={0}
                    />

                    <MusicPlayerIcon
                        onClick={handleShowMusicPlayer}
                        isPlayerOpen={showMusicPlayer}
                        isPlaying={isPlaying}
                        hasPlaylist={currentPlaylist !== null}
                    />

                    <AnimatePresence>
                        {showMusicPlayer && (
                          <MusicPlayer
                              key="music-player"
                              onClose={() => setShowMusicPlayer(false)}
                              playlist={currentPlaylist}
                              startingTrack={startingTrack}
                              onPlayingStateChange={setIsPlaying}
                          />
                      )}
                    </AnimatePresence>
                </Box>
            </HighlightProvider>
        </ThemeProvider>
    );
}

export default App;
