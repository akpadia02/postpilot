import { sendPostToExtension } from '../../utils/sendToExtension';

const PostNowButton = ({ platform, content }) => {
  return (
    <button
      onClick={() => sendPostToExtension(platform, content)}
      className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      🚀 Post Now on {platform}
    </button>
  );
};

export default PostNowButton;
