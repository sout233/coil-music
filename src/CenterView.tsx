import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/tauri';

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

function CenterView() {
    const [data, setData] = useState<unknown>(null);

    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await invoke("fetch_data", { interface: "pop" }) as string;
                let data = JSON.parse(response).data;
                let expose = JSON.parse(data.exposedResource);

                let new_songs: Song[] = [];

                for (let element of expose.song) {
                    let json = await invoke("fetch_data", { interface: "song_details", param1: element }) as string;
                    let detail = JSON.parse(json);
                    const newSong = new Song(detail.songs[0].al.id, detail.songs[0].name, detail.songs[0].ar[0].name, detail.songs[0].al.picUrl, detail.songs[0].al.picUrl);
                    new_songs.push(newSong);
                }

                setSongs(new_songs);

                console.log(new_songs);

                setData(response);
            } catch (error) {
                console.error(error);
            }
        };

        // fetchData();
    }, []);

    // if (!data) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="h-screen w-screen bg-base-200 justify-center flex flex-col space-y-2 items-center">
            <h1 className="text-base-content font-bold text-4xl">🤔 Here is nothing...</h1>
            <h2 className="text-base-content text-lg">Maybe u can try to search something</h2>
        </div>
        // <div className="flex items-center justify-center h-screen w-screen">
        //     <div className="text-center py-10">
        //         <div className="grid grid-cols-4 gap-4">
        //             {
        //                 songs.map((instance: any, index: any) => (
        //                     <div className="bg-base-100 p-6 felx flex-col">
        //                         <img className="rounded-lg shadow-lg" src={instance.cover}></img>
        //                         <a className="text-sm text-base-content top-6" key={index} content={instance.id}>{instance.name}</a>
        //                     </div>
        //                 ))
        //             }
        //         </div>
        //     </div>
        // </div>
    );
}

export default CenterView;