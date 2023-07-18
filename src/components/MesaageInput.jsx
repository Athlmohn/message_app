import React, { useContext, useState } from "react";
import { BsEmojiSmile, BsImages } from "react-icons/bs";
import { IoSend, IoMicOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../Firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function MessageInput() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        (error) => {
          // console.error("Error during image upload:", error);
        },
        () => {
          // Upload complete, get the download URL and update the chat document
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  image: downloadURL,
                }),
              });
            })
            .catch((error) => {
              // console.error("Error getting download URL:", error);
            });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats",currentUser.uid ),{
      [data.chatId +".lastMessage"]:{
        text
      },
      [data.chatId +".date"]:serverTimestamp()
    });
    await updateDoc(doc(db, "userChats",data.user.uid ),{
      [data.chatId +".lastMessage"]:{
        text
      },
      [data.chatId +".date"]:serverTimestamp()
    });

    setText("");
    setImage(null);

  };

  return (
    <div className="messageInput">
      <div className="input-box">
        <div className="input-container">
          <BsEmojiSmile className="smile" />
          <input
            type="text"
            placeholder="Type a message"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <div className="message-icons">
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="file">
            <BsImages />
          </label>
          <IoMicOutline />
          <span onClick={handleSend}>
            <IoSend />
          </span>
        </div>
      </div>
    </div>
  );
}

export default MessageInput;
