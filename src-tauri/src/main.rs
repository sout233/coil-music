// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::future::IntoFuture;

mod api;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn fetch_data(interface: String, param1: Option<String>, param2: Option<String>) -> String {
    let param1 = param1.unwrap_or_else(|| String::from("1"));
    let param2 = param2.unwrap_or_else(|| String::from("2"));

    let data = match interface.as_str() {
        "pop" => api::get_homepage_pop().await.unwrap_or_default(),
        "song_details" => api::get_song_details(&param1).await.unwrap_or_default(),
        "search_songs"=>api::search_songs(&param1).await.unwrap_or_default(),
        _ => "{}".to_string(),
    };

    data
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, fetch_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
