function SearchResultList({ sharedData }: any) {
    let list = []

    function playMusic(id: any) {
        console.log(id)
    }

    try {
        list = sharedData[0].map((item: any, index: any) =>
            <tr className="hover" onDoubleClick={(_) => playMusic(item.id)}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.id}</td>
                <td>{item.artist}</td>
            </tr>
        )
    } catch {
        list = []
    }
    console.log(list)
    if (list.length === 0) {
        return (
            <div className="h-screen w-screen bg-base-200 justify-center flex flex-col space-y-2 items-center">
                <h1 className="text-base-content font-bold text-4xl">🤔 Here is nothing...</h1>
                <h2 className="text-base-content text-lg">Maybe u can try to search something</h2>
            </div>
        );
    } else {
        return (
            <>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>ID</th>
                                <th>Artist</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

}

export default SearchResultList;
