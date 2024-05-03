use reqwest::Error;

pub async fn get_homepage_pop() -> Result<String, Error> {
    let response = reqwest::get("https://api-music.cenguigui.cn/homepage/block/page")
        .await?
        .text()
        .await?;

    Ok(response)
}

pub async fn get_song_details(id: &str) -> Result<String, Error> {
    let response = reqwest::get(&format!("https://api-music.cenguigui.cn/song/detail?ids={}", id))
        .await?
        .text()
        .await?;

    Ok(response)
}

pub async fn search_songs(keywords: &str) -> Result<String, Error> {
    let response = reqwest::get(&format!("https://api-music.cenguigui.cn/search?keywords={}", keywords))
        .await?
        .text()
        .await?;

    Ok(response)
}