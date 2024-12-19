import { useNavigate, useSearchParams } from 'react-router-dom';
import {getTheuserIdsFromRequest} from "./../messanger-serverHandler";

function ChatdbCreateMedical() {
    const [searchParams] = useSearchParams();
    const postedMemberId = searchParams.get('postedMemberId');
    const requestedMemberId = searchParams.get('requestedMemberId');
    const medID = searchParams.get('medicalId');
    const navigate = useNavigate();
    const storedTheConversationUserIds = async()=>{
        // await getTheuserIdsFromRequest(medID!,postedMemberId!,requestedMemberId!)
        // navigate("/messanger");
    }
    return (
        <button onClick={storedTheConversationUserIds}> start chat</button>
    )
}

export default ChatdbCreateMedical