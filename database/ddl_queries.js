import dbConnection from "./connection.js";

dbConnection.execute(`
CREATE TABLE IF NOT EXISTS users (
    user_id int primary key auto_increment,
    email varchar(255) unique,
    username varchar(255) unique,
    password varchar(255),
    name varchar(255),
    image_link varchar(255)
);
`);

dbConnection.execute(`
CREATE TABLE IF NOT EXISTS friends_list (
    friendlist_id int primary key auto_increment,
    user_id int,
    friend_id int,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (friend_id) REFERENCES users (user_id)
);
`);

dbConnection.execute(`
CREATE TABLE IF NOT EXISTS posts (
    post_id int primary key auto_increment,
    user_id int,
    post_text varchar(2000),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);
`);



dbConnection.execute(`
CREATE TABLE IF NOT EXISTS friend_requests (
    request_id int primary key auto_increment,
    sender_id int,
    receiver_id int,
    status enum('pending', 'accepted', 'rejected') default 'pending',
    FOREIGN KEY (sender_id) REFERENCES users (user_id),
    FOREIGN KEY (receiver_id) REFERENCES users (user_id)
);
`);
