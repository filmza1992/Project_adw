export interface Image {
    _id:       string;
    img_url:   string;
    user:      ImageUser;
    create_at: number;
    __v:       number;
}

export interface ImageUser {
    user_id:  string;
    username: string;
    photoURL: string;
}
