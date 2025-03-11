import PostItem from "./postItem/PostItem.jsx";
import './forumcontainer.css';

export default function ForumContainer() {
    const posts = [
        { username: 'JohnDoe', title: 'My First Post', content: 'This is the content of my first post!' },
        { username: 'JaneDoe', title: 'Another Post', content: 'Here is some more content.' },
    ];

    return (
        <div className="forum-container">
            {/* Мапваме през масива с постове и подаваме всеки пост като пропс на PostItem */}
            {posts.map((post, index) => (
                <PostItem key={index} post={post} />
            ))}
        </div>
    );
}
