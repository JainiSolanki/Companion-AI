// import React, { useEffect } from "react";
// import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { Clock, MessageSquare, Trash2 } from "lucide-react";
// import { fetchChatHistory, fetchSessionMessages, setCurrentSession } from "../../store/slices/chatSlice";

// const ChatHistory = () => {
//   const dispatch = useDispatch();
//   const { chatHistory, historyLoading, historyError, currentSessionId } = useSelector(
//     (state) => state.chat
//   );

//   useEffect(() => {
//     dispatch(fetchChatHistory());
//   }, [dispatch]);

//   const handleSessionClick = (session) => {
//     dispatch(setCurrentSession(session.id));
//     dispatch(fetchSessionMessages(session.id));
//   };

//   if (historyLoading) {
//     return (
//       <div className="p-4 flex items-center justify-center h-32">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
//       </div>
//     );
//   }

//   if (historyError) {
//     return (
//       <div className="p-4 text-center">
//         <p className="text-red-400 text-sm">{historyError}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 space-y-3 h-full overflow-y-auto">
//       <div className="flex items-center space-x-2 mb-4">
//         <Clock className="text-blue-400" size={20} />
//         <h3 className="text-lg font-semibold text-white">Chat History</h3>
//       </div>

//       {chatHistory.length === 0 ? (
//         <div className="text-center py-8">
//           <MessageSquare className="mx-auto text-gray-500 mb-4" size={48} />
//           <h4 className="text-white font-medium mb-2">No chat history</h4>
//           <p className="text-gray-400 text-sm">Start chatting to see your history here</p>
//         </div>
//       ) : (
//         <div className="space-y-2">
//           {chatHistory.map((session, index) => (
//             <motion.div
//               key={session.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               onClick={() => handleSessionClick(session)}
//               className={`bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-3 cursor-pointer transition-all duration-200 ${
//                 currentSessionId === session.id ? 'border-blue-400 bg-blue-500/10' : ''
//               }`}
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <h4 className="text-white font-medium text-sm mb-1">
//                     {session.session_name || `Chat ${session.id}`}
//                   </h4>
//                   <p className="text-gray-400 text-xs mb-2">
//                     {session.message_count} messages
//                   </p>
//                   <p className="text-gray-500 text-xs">
//                     {new Date(session.updated_at).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <button className="text-gray-500 hover:text-red-400 p-1">
//                   <Trash2 size={14} />
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatHistory;
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Clock, MessageSquare, Trash2 } from "lucide-react";
// Comment out these API calls for now
// import { fetchChatHistory, fetchSessionMessages, setCurrentSession } from "../../store/slices/chatSlice";

const ChatHistory = () => {
  const dispatch = useDispatch();
  // Temporarily use empty state
  const chatHistory = [];
  const historyLoading = false;
  const historyError = null;
  const currentSessionId = null;

  // Comment out API call for now
  // useEffect(() => {
  //   dispatch(fetchChatHistory());
  // }, [dispatch]);

  const handleSessionClick = (session) => {
    // Temporarily disabled
    console.log("Session clicked:", session.id);
  };

  // Rest of your component code stays the same...
  return (
    <div className="p-4 space-y-3 h-full overflow-y-auto">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="text-blue-400" size={20} />
        <h3 className="text-lg font-semibold text-white">Chat History</h3>
      </div>

      <div className="text-center py-8">
        <MessageSquare className="mx-auto text-gray-500 mb-4" size={48} />
        <h4 className="text-white font-medium mb-2">No chat history</h4>
        <p className="text-gray-400 text-sm">Backend API not implemented yet</p>
      </div>
    </div>
  );
};

export default ChatHistory;

