import { useState } from "react";
import { invoke } from "@tauri-apps/api";

class Song {
    id: string;
    name: string;
    artist: string;
    cover: string;
    url: string;
    constructor(id: string, name: string, artist: string, cover: string, url: string) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.cover = cover;
        this.url = url;
    }
}

function BottomControlPanel({ onDataChange }:any) {
    const [inputValue, setInputValue] = useState('');
    const [rangeValue, setRangeValue] = useState('0');

    const fetchData = async () => {
        let newSongs: Song[] = [];

        try {

            let json = await invoke("fetch_data", { interface: "search_songs", param1: inputValue }) as string;
            let result = JSON.parse(json).result.songs;
            console.log(result);

            const promises = result.map(async (element: any) => {
                let json = await invoke("fetch_data", { interface: "song_details", param1: String(element.id) }) as string;
                let detail = JSON.parse(json);
                let cover = detail.songs[0].al.picUrl;

                const newSong = new Song(element.id, element.name, element.artists[0].name, cover, cover);
                return newSong;
            });

            const songs = await Promise.all(promises);

            // 将所有新歌曲添加到数组中
            newSongs.push(...songs);

            console.log(newSongs);

            onDataChange(newSongs);
        } catch (error) {
            console.error(error);
            return "";
        }

        return newSongs;
    };

    function handleClick() {
        console.log("Searching for: " + inputValue);
        fetchData();
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-base-200 shadow-lg pb-2">
            <input value={rangeValue} onChange={e => {
                setRangeValue(e.target.value);
            }} type="range" min="0" max="100" className="range range-xs" />
            <div>
                <h3 className="absolute p-2 text-base-content text-sm left-3">00:00</h3>
            </div>
            <div className="flex justify-center items-center px-4 py-2">
                <div className="justify-between space-x-2">
                    <button className="btn text-gray-500 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button className="btn text-gray-500 focus:outline-none">
                        <svg className="w-6 h-6" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4260" width="200" height="200"><path d="M817.088 484.96l-512-323.744C295.232 154.976 282.752 154.592 272.576 160.224 262.336 165.856 256 176.608 256 188.256l0 647.328c0 11.648 6.336 22.4 16.576 28.032 4.8 2.656 10.112 3.968 15.424 3.968 5.952 0 11.904-1.664 17.088-4.928l512-323.616C826.368 533.184 832 522.976 832 512 832 501.024 826.368 490.816 817.088 484.96z" fill="#5E6570" p-id="4261"></path></svg>
                    </button>
                    <button className="btn text-gray-500 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
                <label className="justify-end input input-bordered flex items-center gap-2">
                    <input value={inputValue} onChange={e => {
                        setInputValue(e.target.value);
                    }} type="text" className="grow" placeholder="Search" />
                </label>
                <button onClick={handleClick} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </button>
            </div>
        </div>
    );
}

export default BottomControlPanel;