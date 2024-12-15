import React, { useState } from "react";
import { List, Card, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "./Navbar"; // Import the Navbar component

const sampleMessages = [
  {
    id: 1,
    sender: "Alice",
    content: "Hi there! How are you?",
    timestamp: "2024-12-14 10:15 AM",
  },
  {
    id: 2,
    sender: "Bob",
    content: "I'm good, thanks! What about you?",
    timestamp: "2024-12-14 10:16 AM",
  },
  {
    id: 3,
    sender: "Alice",
    content: "I'm doing well too. Thanks for asking!",
    timestamp: "2024-12-14 10:17 AM",
  },
];

const Message = () => {
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
        {/* Back to Products Button */}
        <div style={{ marginBottom: 20 }}>
          <Button type="link">
            <Link to="/products">← Back to Products</Link>
          </Button>
        </div>

        {/* Inbox Section */}
        <Card title="Inbox" bordered={true} style={{ marginBottom: 20 }}>
          <List
            itemLayout="vertical"
            dataSource={messages}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={`${item.sender} - ${item.timestamp}`}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </Card>

        {/* Message Input Section */}
        <Input.TextArea
          rows={4}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          style={{ marginBottom: 10 }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          block
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Message;
