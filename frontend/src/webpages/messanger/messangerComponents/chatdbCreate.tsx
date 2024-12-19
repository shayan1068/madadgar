
import { useNavigate, useSearchParams } from 'react-router-dom';
import {getTheuserIdsFromRequest} from "./../messanger-serverHandler";
function ChatBar() {
  const [searchParams] = useSearchParams();
  const postedMemberId = searchParams.get('postedMemberId');
  const requestedMemberId = searchParams.get('requestedMemberId');
  const postId = searchParams.get('postId');
  const serviceId = searchParams.get('serviceId');
  const navigate = useNavigate();
  const storedTheConversationUserIds = async()=>{
        await getTheuserIdsFromRequest(serviceId!,postedMemberId!,requestedMemberId!,postId!)
        navigate("/messanger");
    }
  return (
    <button onClick={storedTheConversationUserIds}> start chat</button>
  )
}

export default ChatBar