export interface Vote {
    _id:       string;
    point:     number;
    img:       Img;
    create_at: Date;
}

export interface Img {
    img_id:  string;
    img_url: string;
    user:    User;
}

export interface User {
    user_id:  string;
    username: string;
    photoURL: string;
}


