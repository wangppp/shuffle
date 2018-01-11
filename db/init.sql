--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.6
-- Dumped by pg_dump version 9.6.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: docker; Type: DATABASE; Schema: -; Owner: postgres
--
DROP DATABASE IF EXISTS docker;
CREATE DATABASE docker WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE docker OWNER TO postgres;

\connect docker

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE articles (
    id bigint NOT NULL,
    title text,
    author_id bigint,
    content jsonb,
    views bigint,
    comments bigint,
    created_at bigint,
    updated_at bigint,
    html_content text,
    tag character varying,
    post_state boolean DEFAULT false,
    en_title character varying NOT NULL,
    hero_img character varying
);


ALTER TABLE articles OWNER TO docker;

--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE articles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE articles_id_seq OWNER TO docker;

--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE articles_id_seq OWNED BY articles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE users (
    id bigint NOT NULL,
    name text,
    emails jsonb,
    password_salt text,
    password_hash text,
    role smallint
);


ALTER TABLE users OWNER TO docker;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO docker;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY articles ALTER COLUMN id SET DEFAULT nextval('articles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY articles (id, title, author_id, content, views, comments, created_at, updated_at, html_content, tag, post_state, en_title, hero_img) FROM stdin;
26	吉林的雪	1	{"blocks": [{"key": "5h3u8", "data": {}, "text": "一.  初雪", "type": "header-three", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "cp39j", "data": {}, "text": "人们大抵是喜欢下雪的。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "ci8pb", "data": {}, "text": "今年雪季来的很晚，但昨天傍晚开始，天公好像把积蓄了一年的雪都下了。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "84cli", "data": {}, "text": "不知不觉间，天空中由零散的小绒絮，转变为了厚实的雪花，他们欢快密集的下着，仿佛靠近就能听见互相摩擦发出的悉悉索索的声音。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "bg7q4", "data": {}, "text": "真是“落得个大地白茫茫啊真干净”！", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "3i3a2", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "3fi7l", "data": {}, "text": "我大抵是看窗外的雪看的出神了，连屋内的罐中的水开了都未知觉。氤氲的蒸汽慢慢的弥散到头发上，迅速凝结。大约是时间静止了吧。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "73u6o", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "1elha", "data": {}, "text": "“你不能再去挖矿了！！你是知道你的身体的......”", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "8vc4t", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "94eir", "data": {}, "text": "像是在努力的去挣扎着说出的最后的嘶哑的声音，他打破了沉默，不，是这片安宁景象。他苍白的嘴唇像是大病初愈一样，微微颤抖着。距离他腿部受伤已经过去二十日了。那天寒冷的夜里是我们都不愿回想的噩梦。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "dujo0", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "a0j00", "data": {}, "text": "我没有回头。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "etino", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "c6buq", "data": {}, "text": "我想，吉林的雪大抵还是不如长岛的雪美丽。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "59sn1", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "7hp9l", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 0, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "d0he7", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "1qvk0", "data": {}, "text": "二.  罐装的天才", "type": "header-three", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "1u2e3", "data": {}, "text": "“你真是一个罐装的天才啊.！！！哈哈哈.”", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "28me6", "data": {}, "text": "看着手中隐约闪耀着的绿光的萤石，大表哥再也控制不住，对着宝石狂喜起来。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "87cvj", "data": {}, "text": "我视线有点模糊，一声不发，汗水已经让翼甲内部湿透了。看来这次任务又加剧了毒性。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "aoilj", "data": {}, "text": "“快点交钱！”", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "ecq8l", "data": {}, "text": "我竭力的对他吼了出来，“当时说好的拿到萤石分我60万铢！”", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "1d23r", "data": {}, "text": "“我怎么亏待你弟弟，你这么厉害，表哥就靠你呢哈哈”", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "4u4nk", "data": {}, "text": "此时虹膜屏发出通知，以太币账户收到转账。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "i7qm", "data": {}, "text": "“好啦弟弟，下次任务我会再通知你的哈哈”", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "djl0n", "data": {}, "text": "走出通天塔，我俯瞰了下城市，这无比熟悉的穹顶，此刻竟感到一丝晕眩。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "ba2ee", "data": {}, "text": "对了，得快点给他买药。我心想。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "5k7mu", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "28lmj", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 1, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "c2hrl", "data": {}, "text": " ", "type": "unstyled", "depth": 0, "entityRanges": [{"key": 2, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "7620d", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {"0": {"data": {"src": "http://res.cloudinary.com/dvr2kk33p/image/upload/v1515667887/snow_night_zqfiwt.jpg", "width": "auto", "height": "auto", "alignment": "none"}, "type": "IMAGE", "mutability": "MUTABLE"}, "1": {"data": {"src": "http://res.cloudinary.com/dvr2kk33p/image/upload/v1515667720/cyberpunk_city_wq5jwa.jpg", "width": "100%", "height": "100%", "alignment": "none"}, "type": "IMAGE", "mutability": "MUTABLE"}, "2": {"data": {"src": "http://res.cloudinary.com/dvr2kk33p/image/upload/v1515667720/cyberpunk_city_wq5jwa.jpg", "width": "auto", "height": "auto"}, "type": "IMAGE", "mutability": "MUTABLE"}}}	\N	\N	1515654218	1515654218	\N	literature	t	jilin-snow-season	http://res.cloudinary.com/dvr2kk33p/image/upload/c_scale,w_2000/v1515653116/bdhtestimg_bioxni.jpg
\.


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('articles_id_seq', 26, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY users (id, name, emails, password_salt, password_hash, role) FROM stdin;
1	Adam	\N	\N	$2a$04$w1CC5RcMTcgYk27B6DkMb.6slCJVkEH5i//0Y3kGCYh3glRU1KVOC	7
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('users_id_seq', 1, true);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

