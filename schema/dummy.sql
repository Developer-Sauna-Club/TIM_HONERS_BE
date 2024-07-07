INSERT INTO Hello (title, content) VALUES ('Hello', 'World1');
INSERT INTO Hello (title, content) VALUES ('Bye', 'World2');
INSERT INTO Hello (title, content) VALUES ('Good', 'World3');

-- User 테이블에 더미 데이터 삽입
INSERT INTO `User` (email, password, fullName, username, profileImage, coverImage) VALUES
('user1@example.com', 'password123', '김짱구', '안녕!', 'https://res.cloudinary.com/learnprogrammers/image/upload/v1720356641/user/a4f5e359-10e8-4ed5-9a2a-9047814a9da9.png', 'cover1.jpg'),
('user2@example.com', 'password456', '곰돌이', '베어베어', 'https://res.cloudinary.com/learnprogrammers/image/upload/w_128,h_128/v1695749092/user/1952c4e4-230b-463b-950c-8973717bced3.jpg', 'cover2.jpg'),
('user3@example.com', 'password789', '동자스님', '나무아미타불', 'https://res.cloudinary.com/learnprogrammers/image/upload/w_128,h_128/v1695899162/user/8d79eeb1-3cee-4778-a79d-bf15e15a6e24.png', 'cover3.jpg');

-- Channel 테이블에 더미 데이터 삽입
INSERT INTO `Channel` (description, name) VALUES
('TMI를 뉴스 형태로 적을 수 있는 SNS', 'TMIHomers'),

-- Post 테이블에 더미 데이터 삽입
INSERT INTO `Post` (image, imagePublicId, title, userId, channelId) VALUES
('https://res.cloudinary.com/learnprogrammers/image/upload/w_350,h_320/v1714219388/post/b269f798-4ff1-47c8-bc8a-51ee205ba19e.png', 'post/dd35b360-8a44-44c5-93fb-224a0d134ed8', '{\"title\":\"[속보] 제로 콜라 구매한거 왔다.\",\"body\":\"모두 건강을 위해 제로 음료를 마시도록 해요.\\n\\n와 정 말 대 단 해!\} ', 1, 1),
('https://res.cloudinary.com/learnprogrammers/image/upload/v1695742443/post/6c98d365-c800-46a0-96df-300405b1ee03.jpg', 'post/6c98d365-c800-46a0-96df-300405b1ee03', '{\"title\":\"[폭소] 나는 칼라와 하나가 된다!!!\",\"body\":\"엔타로 아둔!\"}', 2, 1),
('https://res.cloudinary.com/learnprogrammers/image/upload/v1695741497/post/0f86db59-0150-4012-8b01-51a9d8d39a29.jpg', 'post/0f86db59-0150-4012-8b01-51a9d8d39a29', '{\"title\":\"[충격] 소원을 들어주는 지니\",\"body\":\"지니는 4개의 소원을 들어주지 못해\"}', 3, 1);

-- Comment 테이블에 더미 데이터 삽입
INSERT INTO `Comment` (comment, userId, postId) VALUES
('나 곰돌이. 당신의 자전거질에 매우 감탄했소이다...!', 2, 1),
('♚♚히어로즈 오브 더 스☆톰♚♚가입시$$전원 카드팩☜☜뒷면100%증정※ ♜월드오브 워크래프트♜펫 무료증정￥ 특정조건 §§디아블로3§§★공허의유산★초상화획득기회@@@ 즉시이동', 1, 2),
('엔타로 아둔!', 1, 2),
('취업하게 해주세요. 나무아미타불', 3, 3);
('나 곰돌이. 내 소원은 꿀통이오.', 2, 3);
('이쁜 누나다!', 1, 3);

-- Follow 테이블에 더미 데이터 삽입
INSERT INTO `Follow` (followerId, followingId) VALUES
(1, 2),
(2, 3),
(3, 1);

-- Like 테이블에 더미 데이터 삽입
INSERT INTO `Like` (userId, postId) VALUES
(1, 2),
(2, 3),
(3, 1);
